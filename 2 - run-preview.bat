@echo off
SETLOCAL
pushd "%~dp0"

REM === Check if npm is installed ===
where npm >NUL 2>&1
IF ERRORLEVEL 1 (
    echo [ERROR] npm is not installed or not in PATH.
    echo Please install Node.js and make sure npm works in your terminal.
    pause
    exit /b 1
)

REM === Run Nuxt preview server in the background ===
echo Starting preview server...
start /b npm run preview

REM === Wait for Nuxt to start ===
echo Waiting for the server to start...
timeout /t 5 /nobreak > NUL

REM === Open browser ===
echo Opening browser at http://localhost:3000 ...
start "" "http://localhost:3000"

echo.
echo ========================================
echo Preview server running! Press Ctrl+C to stop it.
echo ========================================
echo.

REM === Keep CMD open for logs ===
cmd /k

popd
ENDLOCAL