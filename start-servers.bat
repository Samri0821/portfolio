@echo off
echo ========================================
echo   PORTFOLIO WEBSITE - SERVER STARTER
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js found
echo.

REM Install dependencies if needed
echo Checking server dependencies...
if not exist "server\node_modules" (
    echo Installing server dependencies...
    cd server
    call npm install
    cd ..
) else (
    echo [OK] Server dependencies installed
)

echo.
echo Checking client dependencies...
if not exist "client\node_modules" (
    echo Installing client dependencies...
    cd client
    call npm install
    cd ..
) else (
    echo [OK] Client dependencies installed
)

echo.
echo ========================================
echo Starting servers...
echo ========================================
echo.

REM Start Backend in new window
echo [1/2] Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd server && npm start"

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start Frontend in new window
echo [2/2] Starting Frontend Client (Port 3001)...
start "Frontend Client" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3001
echo.
echo Please wait 5-10 seconds for both servers to start.
echo Then open your browser to: http://localhost:3001
echo.
echo If this window closes, your servers are still running
echo in the other two windows.
echo.
pause
