const API_KEY = 'eee08e71b6364259a3faaaed2ed513e1';
const LOG_FILE_NAME = 'jeju_api_log.txt';  // 구글 드라이브에 생성될 로그 파일 이름

function doGet(e) {
  const cid = e.parameter.cid;

  if (!cid) {
    logError('CID 누락', JSON.stringify(e));
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'CID 누락' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const url = `http://api.visitjeju.net/vsjApi/contents/searchList`;
  const params = {
    apiKey: API_KEY,
    locale: 'kr',
    category: 'c1',
    page: '1',
    cid: cid
  };

  const query = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');

  const fullUrl = `${url}?${query}`;

  try {
    const response = UrlFetchApp.fetch(fullUrl, {
      method: 'get',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'application/json',
        Connection: 'close'
      },
      muteHttpExceptions: true
    });

    const content = response.getContentText();

    return ContentService.createTextOutput(content)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    logError('API 호출 실패', err.toString());
    return ContentService.createTextOutput(
      JSON.stringify({
        error: 'API 호출 실패',
        detail: err.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Google 드라이브 텍스트 파일에 로그 저장
function logError(title, detail) {
  const folder = DriveApp.getRootFolder();  // 또는 특정 폴더로 변경 가능
  const logText = `[${new Date().toISOString()}] ${title} | ${detail}\n`;

  try {
    let file;
    const files = folder.getFilesByName(LOG_FILE_NAME);

    if (files.hasNext()) {
      file = files.next();
      const content = file.getBlob().getDataAsString();
      file.setContent(content + logText);
    } else {
      folder.createFile(LOG_FILE_NAME, logText);
    }
  } catch (err) {
    Logger.log('로그 파일 저장 실패: ' + err.toString());
  }
}