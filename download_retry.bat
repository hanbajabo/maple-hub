@echo off
echo Downloading high quality banner...
curl -L -o "c:\Users\USER\Desktop\maple-colosseum\maple-hub\public\images\blog\haste_beyond_banner.jpg" "https://maplestory.nexon.com/Content/img/haste_beyond_banner.jpg"
if %errorlevel% neq 0 (
    curl -L -o "c:\Users\USER\Desktop\maple-colosseum\maple-hub\public\images\blog\haste_beyond_banner.jpg" "https://maplestory.io/api/GMS/229/mob/100100/icon"
)
echo Checking file...
dir "c:\Users\USER\Desktop\maple-colosseum\maple-hub\public\images\blog\haste_beyond_banner.jpg"
