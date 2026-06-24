import urllib.request, re, json
req = urllib.request.Request('https://maplestory.nexon.com/News/CashShop', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'<img[^>]*src=[\'\"]([^\'\"]*?(?:png|jpg|jpeg|gif))[\'\"]', html)
    print(json.dumps(list(set(images)), indent=2))
except Exception as e:
    print("Error:", e)
