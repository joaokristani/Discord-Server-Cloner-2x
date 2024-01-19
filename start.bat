@echo off
setlocal

set "nodejs_path="

echo Tentando encontrar o Node.js
timeout /nobreak /t 1 >nul

:loading
echo.
echo Loading.
timeout /nobreak /t 1 >nul
cls

echo.
echo Loading..
timeout /nobreak /t 1 >nul
cls

echo.
echo Loading...
timeout /nobreak /t 1 >nul
cls

for /f "tokens=*" %%i in ('where node') do (
    set "nodejs_path=%%i"
)

if not defined nodejs_path (
    echo Node.js não encontrado, terá uma tentativa de instalação usando scoop, provavelmente irá falhar
    where scoop >nul 2>nul
    if %errorlevel% neq 0 (
        echo Instalando Scoop...
        echo Quando o scoop for instalado feche e abra o terminal
        Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
        echo.
        pause
        exit /b 1
    )

    echo Instalando Node.js usando Scoop...
    call scoop install nodejs

    where node >nul 2>nul
    if %errorlevel% neq 0 (
        echo Não foi possível instalar nodejs, instale manualmente: https://nodejs.org/en
        pause
        exit /b 1
    )

    for /f "tokens=*" %%i in ('where node') do (
        set "nodejs_path=%%i"
    )
)

echo Node.js encontrado em: %nodejs_path%
node --version

if not exist "node_modules" (
    echo Instalando...
    call npm i
)

where tsx >nul 2>nul
if %errorlevel% neq 0 (
    echo instalando tsx..
    call npm i -g tsx
)

tsx .

endlocal
