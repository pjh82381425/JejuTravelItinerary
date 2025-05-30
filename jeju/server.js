const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const rax = require('retry-axios');
require('dotenv').config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

// 로그 디렉토리 및 경로
const logDir = path.join(__dirname, 'logs');
const logFilePath = path.join(logDir, 'react-error.log');

// 디렉토리 없으면 생성
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 에러 로그 기록 함수
function logError(msg) {
  const now = new Date().toISOString();
  const line = `[${now}] ${msg}\n`;
  fs.appendFile(logFilePath, line, (err) => {
    if (err) console.error('로그 기록 실패:', err);
  });
}

// JSON 파싱
app.use(express.json());

//  리액트 클라이언트에서 오는 에러 로그 저장 API
app.post('/api/ReactErrorLog', (req, res) => {
  const clientKey = req.headers['x-api-key'];
  if (!clientKey || clientKey !== API_KEY) {
    return res.status(403).send('접근이 거부되었습니다.');
  }

  const { message, context, timestamp } = req.body;
  if (!message || !timestamp) {
    return res.status(400).send('잘못된 요청 형식입니다.');
  }

  const logLine = `[${timestamp}]\n메시지: ${message}\n컨텍스트: ${JSON.stringify(context, null, 2)}\n\n`;

  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      console.error('로그 저장 실패:', err);
      return res.status(500).send('로그 저장 실패');
    }
    console.log('로그 저장 성공');
    res.sendStatus(200);
  });
});

// axios 인스턴스 및 rax 재시도 설정 구성
const client = axios.create({
  timeout: 10000, // 10초 대기
});

// rax 기본 설정 추가
client.defaults.raxConfig = {
  instance: client,
  retry: 2,  // 최대 2회 재시도
  noResponseRetries: 2,
  httpMethodsToRetry: ['GET', 'POST'],
  retryDelay: 2000, // 2초 간격
  backoffType: 'static',
  onRetryAttempt: err => {
    const cfg = rax.getConfig(err);
    console.warn(`⏳ 재시도 #${cfg.currentRetryAttempt}`);
  },
};

rax.attach(client);

// 재시도 함수
async function fetchWithRetry(url, params, maxRetries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.get(url, { params });
    } catch (err) {
      console.warn(` 요청 실패 (시도 ${attempt}/${maxRetries}): ${err.message}`);
      if (attempt === maxRetries) throw err;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

// express 라우터
app.get('/api/content/:cid', async (req, res) => {
  const cid = req.params.cid;

  if (!cid) {
    logError('cid 미입력');
    return res.status(400).json({ error: 'CID 누락' });
  }

  try {
    // VisitJeju API를 우회 요청하는 Google Apps Script 프록시 URL
    const proxyUrl = 'https://script.google.com/macros/s/AKfycbzGbn9SJKsu4kxReHbTIDGgSn0V_nI6vzhqrXtxifZcqlqcubup6ImgfPFyEJ0MJZh4Lg/exec';

    // 재시도 로직
    const resp = await fetchWithRetry(proxyUrl, { cid });

    const items = resp.data.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      logError(`데이터 없음: CID=${cid}`);
      return res.status(404).json({ error: '해당 콘텐츠가 존재하지 않습니다.' });
    }

    const item = items[0];
    res.json({
      contents: [
        {
          title: item.title,
          introduction: item.introduction,
          address: item.address,
          phoneno: item.phoneno,
          image: item.repPhoto?.photoid?.imgpath || '',
          latitude: item.latitude,
          longitude: item.longitude
        }
      ]
    });
  } catch (err) {
    logError(`API 호출 오류: ${err.message}`);
    if (err.response) {
      logError(`응답 상태: ${err.response.status}`);
      logError(`응답 데이터: ${JSON.stringify(err.response.data)}`);
    }
    res.status(500).json({ error: '제주 API 호출 실패' });
  }
});

app.use(express.static(path.join(__dirname, 'build')));

// React SPA의 라우팅 처리를 위해, API 요청이 아닌 모든 경로는 index.html로 응답
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});