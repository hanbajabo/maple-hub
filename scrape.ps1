$html = Invoke-WebRequest -Uri 'https://maplestory.nexon.com/News/CashShop' -UseBasicParsing | Select-Object -ExpandProperty Content
$regex = '<img[^>]*src=["'']([^"'']*\.(?:png|jpg|jpeg|gif))["'']'
$matches = [regex]::Matches($html, $regex)
$matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
