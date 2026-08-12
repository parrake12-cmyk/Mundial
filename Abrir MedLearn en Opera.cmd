@echo off
setlocal
cd /d "%~dp0"

set "MEDLEARN_URL=http://localhost:3000/#enfermedad/REN-001"
set "OPERA_EXE=%LOCALAPPDATA%\Programs\Opera GX\opera.exe"

if not exist "%OPERA_EXE%" set "OPERA_EXE=%LOCALAPPDATA%\Programs\Opera\opera.exe"

if not exist "%OPERA_EXE%" (
  echo No se encontro Opera ni Opera GX en la ubicacion esperada.
  echo Abre manualmente: %MEDLEARN_URL%
  pause
  exit /b 1
)

powershell.exe -NoProfile -WindowStyle Hidden -Command "if (-not (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue)) { Start-Process -FilePath 'node' -ArgumentList 'backend/server.js' -WorkingDirectory '%~dp0' -WindowStyle Hidden }"

powershell.exe -NoProfile -Command "$ready = $false; 1..20 | ForEach-Object { if (-not $ready) { try { $response = Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3000/' -TimeoutSec 1; $ready = $response.StatusCode -eq 200 } catch {}; if (-not $ready) { Start-Sleep -Milliseconds 250 } } }; if (-not $ready) { exit 1 }"

if errorlevel 1 (
  echo No fue posible iniciar MedLearn en el puerto 3000.
  pause
  exit /b 1
)

start "" "%OPERA_EXE%" "%MEDLEARN_URL%"
endlocal
