@echo off
cd /d "%~dp0"
echo Устанавливаем библиотеку для чтения CSV (подождите)...
"C:\Program Files\nodejs\npm.cmd" install csv-parser
echo.
echo Установка завершена!
pause