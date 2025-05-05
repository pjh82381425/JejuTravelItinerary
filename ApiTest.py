import requests

url = 'http://api.visitjeju.net/vsjApi/contents/searchList'
params = {
    'apiKey': 'eee08e71b6364259a3faaaed2ed513e1',
    'locale': 'kr',
    'category': 'c1',
    'page': '1',
    'cid': 'CONT_000000000500349'
}

response = requests.get(url, params=params)
data = response.json()
print(data)

items = data.get('items', [])  # 수정된 부분
for item in items:
    print("제목:", item.get('title'))
    print("소개:", item.get('introduction'))
    print("주소:", item.get('roadaddress'))
    print("이미지 URL:", item.get('repPhoto', {}).get('photoid', {}).get('imgpath'))
    print("=" * 30)