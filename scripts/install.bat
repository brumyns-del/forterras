@echo off
cd /d "%~dp0"
echo Установка необходимых библиотек...
"C:\Program Files\nodejs\npm.cmd" init -y
"C:\Program Files\nodejs\npm.cmd" install csv-parser
echo.
echo Установка завершена!
pause