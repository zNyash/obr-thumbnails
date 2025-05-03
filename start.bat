@echo off
SETLOCAL

pushd "%~dp0"

echo Starting Nuxt server in preview mode...
start /b npm run preview

echo Waiting for the server to start... (adjust time if needed)
timeout /t 5 /nobreak > NUL

echo Opening browser at http://localhost:3000...
start "" "http://localhost:3000"

echo Server started and browser opened. Press Ctrl+C to stop the server.

ENDLOCAL
