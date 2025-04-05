const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// React 정적 빌드 서빙
app.use(express.static(path.join(__dirname, 'build')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});