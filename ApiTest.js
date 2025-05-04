import express from 'express'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'

// 로그 디렉토리 경로
const logDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)

// 액세스 로그 스트림 (append 모드)
const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }
)
// morgan을 이용해 액세스 로그 기록
const app = express()
app.use(morgan('combined', { stream: accessLogStream }))

// 에러 로그 파일 경로
const errorLogPath = path.join(logDir, 'error.log')
// 에러 로그를 append 방식으로 저장하는 함수
function logError(message) {
  const timestamp = new Date().toISOString()
  fs.appendFileSync(
    errorLogPath,
    `[${timestamp}] ${message}\n`,
    { encoding: 'utf8', flag: 'a' }
  )
}

// 제주 콘텐츠 조회 함수
async function fetchJejuContent(apiKey, cid) {
  if (!apiKey) {
    logError('API 키 미설정')
    throw new Error('서버 설정 오류: API 키가 없습니다.')
  }
  if (!cid) {
    logError('cid 미입력')
    throw new Error('요청 오류: 콘텐츠 ID가 필요합니다.')
  }

  const url = 'http://api.visitjeju.net/vsjApi/contents/searchList'
  const params = { apiKey, locale: 'kr', category: 'c1', page: '1', cid }
  const headers = {
    'User-Agent': 'Mozilla/5.0',
    Accept:       'application/json',
    Connection:   'close'
  }

  try {
    const resp = await axios.get(url, { params, headers, timeout: 20000 })
    return resp.data
  }
  catch (err) {
    logError(`API 호출 오류: ${err.message}`)
    throw new Error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
  }
}

// 콘텐츠 조회 엔드포인트
app.get('/content/:cid', async (req, res) => {
  const apiKey = process.env.API_KEY
  const cid    = req.params.cid

  try {
    const data = await fetchJejuContent(apiKey, cid)
    res.json(data)
  }
  catch (err) {
    logError(`핸들러 오류: ${err.message} (CID=${cid}, IP=${req.ip})`)
    res.status(500).json({ error: err.message })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`)
})