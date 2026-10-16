@echo off
chcp 65001 >nul
rem === CASA Construction: saytni yangilash (GitHub -> Netlify) ===
rem Shu faylni loyiha papkasi ichida ikki marta bosing.
set "REPO=https://github.com/Mirzokhid2379/casa-constructions.git"

cd /d "%~dp0"
git config --global --add safe.directory "*" >nul 2>&1
if not exist ".git" (
  git init -b main >nul
  git remote add origin %REPO%
)
git remote set-url origin %REPO%
git fetch origin
git reset --soft origin/main
git add -A
git commit -m "Uy rasmlari, yangi guvohnoma va ijtimoiy tarmoqlar"
git push -u origin main
echo.
if errorlevel 1 (
  echo XATO: GitHub'ga yuborilmadi. Shu oynaning skrinshotini yuboring.
) else (
  echo Tayyor! Netlify 1-2 daqiqada saytni o'zi yangilaydi.
)
pause
