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

REM === Check for node_modules folder ===
IF NOT EXIST "node_modules" (
    echo node_modules folder not found. Installing dependencies...
    npm install
    IF ERRORLEVEL 1 (
        echo [ERROR] npm install failed. Check your internet connection or package.json.
        pause
        exit /b 1
    )
)

REM === Build the project ===
echo Building project...
npm run build
IF ERRORLEVEL 1 (
    echo [ERROR] Build failed.
    pause
    exit /b 1
)

echo.
echo ==========================
echo ✔ Build completed!
echo ==========================
echo.

pause
popd
ENDLOCAL