const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
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
    if (err) console.error('❌ 로그 기록 실패:', err);
  });
}

// JSON 파싱
app.use(express.json());

// ✅ 리액트 클라이언트에서 오는 에러 로그 저장 API
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
      console.error('❌ 로그 저장 실패:', err);
      return res.status(500).send('로그 저장 실패');
    }
    console.log('✅ 로그 저장 성공');
    res.sendStatus(200);
  });
});

app.get('/api/content/:cid', async (req, res) => {
  const apiKey = 'eee08e71b6364259a3faaaed2ed513e1';
  const cid = req.params.cid;

  if (!apiKey) {
    logError('API 키 미설정');
    return res.status(500).json({ error: 'API 키 없음' });
  }
  if (!cid) {
    logError('cid 미입력');
    return res.status(400).json({ error: 'CID 누락' });
  }

  const url = 'http://api.visitjeju.net/vsjApi/contents/searchList';
  const params = { apiKey, locale: 'kr', category: 'c1', page: '1', cid };
  const headers = {
    'User-Agent': 'Mozilla/5.0',
    Accept: 'application/json',
    Connection: 'close'
  };

  try {
    const resp = await axios.get(url, { params, headers, timeout: 20000 });

    // ✅ 실제 API는 items를 바로 리턴하고 있음
    const items = resp.data.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      logError(`데이터 없음: CID=${cid}`);
      return res.status(404).json({ error: '해당 콘텐츠가 존재하지 않습니다.' });
    }

    // ✅ 필요한 데이터만 추출해서 반환
    const item = items[0];
    res.json({
      contents: [
        {
          title: item.title,
          description: item.introduction,
          address: item.roadaddress,
          tel: item.phoneno,
          image: item.repPhoto?.photoid?.imgpath || '',
          operating_hours: '정보 없음',
          entrance_fee: '정보 없음'
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

// ✅ 리액트 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'build')));

// ✅ SPA 대응 (404 방지) + API 경로를 SPA 대응에서 제외
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ✅ 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});