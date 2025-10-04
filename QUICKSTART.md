# Forensi-Link Quick Start Guide

## ✅ Both Servers Are Running!

### Frontend (React + Vite)
- **URL**: http://localhost:8081
- **Status**: ✅ RUNNING
- **Note**: Port changed from 8080 to 8081 because 8080 was in use

### Backend (Flask API)
- **URL**: http://localhost:5000
- **Status**: ✅ RUNNING
- **Health Check**: http://localhost:5000/api/health
- **Cases API**: http://localhost:5000/api/cases
- **Graph API**: http://localhost:5000/api/cases/2025-047-VA/graph

## 🌐 Access the Application

**Main Website**: http://localhost:8081

### Features Available:
1. **Dashboard** - Main forensic analysis interface
2. **Query Analysis** - Click "Query Analysis" button in header
3. **Network Graph** - Interactive visualization with Arjun Varma case
4. **Case Selector** - View all cases from database

## 🔧 If You See "Unreachable" Errors

### Check Backend Connection:
1. Open http://localhost:5000/api/health in browser
2. Should see: `{"status": "healthy", "message": "Forensi-Link API is running"}`

### Check Frontend:
1. Open http://localhost:8081
2. Should see the forensic analysis dashboard

### Console Errors (Browser F12):
If you see CORS or connection errors in browser console:
- Make sure both servers are running
- Backend should be on http://localhost:5000
- Frontend should be on http://localhost:8081
- Check browser console (F12) for specific error messages

## 🚀 How to Use:

### View Network Graph:
1. Go to http://localhost:8081
2. Click "Run Linkage Analysis" button
3. Interactive graph should load with Arjun Varma case data

### Query Analysis Console:
1. Click "Query Analysis" button in header
2. See Arjun Varma case details
3. Enter queries and run analysis

### Browse Cases:
1. Switch to "Specific Case Comparison" mode
2. See dropdown with all 6 cases from database:
   - 2025-047-VA: Varma Network Analysis
   - 2024-001: Theft Investigation
   - 2024-007: Fraud Case
   - 2023-015: Cybercrime
   - 2023-092: Narcotics Operation
   - 2022-045: Murder Investigation

## 📊 API Endpoints You Can Test:

```
GET http://localhost:5000/api/health
GET http://localhost:5000/api/cases
GET http://localhost:5000/api/cases/2025-047-VA
GET http://localhost:5000/api/cases/2025-047-VA/graph
```

## 🐛 Troubleshooting:

### Backend Not Responding:
```powershell
cd C:\VSstuff\forensi-link\backend
python app.py
```

### Frontend Not Loading:
```powershell
cd C:\VSstuff\forensi-link
npm run dev
```

### Clear Browser Cache:
- Press Ctrl + Shift + R (hard refresh)
- Clear browser cache and cookies

### Check Terminal Output:
Look for any error messages in the PowerShell terminals where the servers are running.

---

**Status**: Both servers are ACTIVE and ready to use! 🎉
