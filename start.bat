@echo off
echo Starting Osmania University Accessibility Navigation System...

echo Starting Backend (Flask on port 5000)...
start "Backend - Flask" cmd /k "cd /d D:\pranaycse\OU_hackthon\backend && python app.py"

timeout /t 2 /nobreak > nul

echo Starting Frontend (React on port 3000)...
start "Frontend - React" cmd /k "cd /d D:\pranaycse\OU_hackthon\Frontend && npm start"

echo Both servers are starting!
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
