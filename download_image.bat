@echo off
echo Downloading Haste Beyond Banner...
curl -L -o "c:\Users\USER\Desktop\maple-colosseum\maple-hub\public\images\blog\haste_beyond_banner.jpg" "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%%3A%%2F%%2Fblog.kakaocdn.net%%2Fdn%%2FbaLw59%%2FbtsLkp9kUfM%%2F2Uv2o2kIkKkKkKkKkKkKkK%%2Fimg.jpg"
if %errorlevel% equ 0 (
    echo Successfully downloaded!
) else (
    echo Download failed with error %errorlevel%
)
