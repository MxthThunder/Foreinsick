# Server Status Check Script
# Run this to verify both servers are working

Write-Host "`n=== Forensi-Link Server Status Check ===" -ForegroundColor Cyan

# Check Backend
Write-Host "`n[1] Checking Backend (Flask API)..." -ForegroundColor Yellow
try {
    $backend = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 5
    $backendData = $backend.Content | ConvertFrom-Json
    Write-Host "   ✓ Backend is RUNNING" -ForegroundColor Green
    Write-Host "   Status: $($backendData.status)" -ForegroundColor Green
    Write-Host "   URL: http://localhost:5000" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ Backend is NOT responding" -ForegroundColor Red
    Write-Host "   Start it with: cd backend; python app.py" -ForegroundColor Yellow
}

# Check Frontend
Write-Host "`n[2] Checking Frontend (Vite)..." -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:8080" -UseBasicParsing -TimeoutSec 5
    Write-Host "   ✓ Frontend is RUNNING" -ForegroundColor Green
    Write-Host "   URL: http://localhost:8080" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ Frontend is NOT responding" -ForegroundColor Red
    Write-Host "   Start it with: npm run dev" -ForegroundColor Yellow
}

# Check Database
Write-Host "`n[3] Checking Database..." -ForegroundColor Yellow
$dbPath = ".\backend\forensilink.db"
if (Test-Path $dbPath) {
    $dbSize = (Get-Item $dbPath).Length / 1KB
    Write-Host "   ✓ Database exists" -ForegroundColor Green
    Write-Host "   Size: $([math]::Round($dbSize, 2)) KB" -ForegroundColor Gray
    Write-Host "   Location: $dbPath" -ForegroundColor Gray
} else {
    Write-Host "   ✗ Database NOT found" -ForegroundColor Red
    Write-Host "   Create it with: cd backend; python seed.py" -ForegroundColor Yellow
}

# Test API Connection
Write-Host "`n[4] Testing API Connection..." -ForegroundColor Yellow
try {
    $cases = Invoke-WebRequest -Uri "http://localhost:5000/api/cases" -UseBasicParsing -TimeoutSec 5
    $casesData = $cases.Content | ConvertFrom-Json
    Write-Host "   ✓ API is responding" -ForegroundColor Green
    Write-Host "   Cases in database: $($casesData.Count)" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ API is NOT accessible" -ForegroundColor Red
}

# Summary
Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Frontend:  http://localhost:8080" -ForegroundColor White
Write-Host "Backend:   http://localhost:5000" -ForegroundColor White
Write-Host "API Docs:  http://localhost:5000/api/health" -ForegroundColor White
Write-Host "`nPress any key to open the application..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Start-Process "http://localhost:8080"
