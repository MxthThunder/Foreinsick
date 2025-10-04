# Forensi-Link Full-Stack Integration Guide

## 🎯 Overview

Forensi-Link is now a complete full-stack forensic analysis platform with:
- **Frontend**: React + TypeScript + Vite (Port 8080)
- **Backend**: Flask + SQLAlchemy + SQLite (Port 5000)
- **Real-time API**: RESTful API with complete CRUD operations

---

## 🚀 Running the Application

### Start Backend (Terminal 1)
```powershell
cd C:\VSstuff\forensi-link\backend
python app.py
```
✅ Backend runs on: http://localhost:5000

### Start Frontend (Terminal 2)
```powershell
cd C:\VSstuff\forensi-link
npm run dev
```
✅ Frontend runs on: http://localhost:8080

---

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Index    │  │  Console   │  │  Results   │           │
│  │   Page     │  │   Page     │  │   Panel    │           │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘           │
│        │                │                │                   │
│        └────────────────┴────────────────┘                   │
│                         │                                    │
│                    ┌────▼─────┐                             │
│                    │ API Layer │                            │
│                    │ (api.ts)  │                            │
│                    └────┬──────┘                            │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTP Requests
                          │ (localhost:5000/api)
┌─────────────────────────▼───────────────────────────────────┐
│                     BACKEND (Flask)                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  REST API Routes                        │ │
│  │  /api/cases  /api/cases/<id>  /api/cases/<id>/graph   │ │
│  └─────────────────────┬───────────────────────────────────┘ │
│                        │                                      │
│  ┌─────────────────────▼───────────────────────────────────┐ │
│  │              SQLAlchemy ORM Models                      │ │
│  │       Case  │  Entity  │  Connection                   │ │
│  └─────────────────────┬───────────────────────────────────┘ │
│                        │                                      │
│  ┌─────────────────────▼───────────────────────────────────┐ │
│  │              SQLite Database                            │ │
│  │                forensilink.db                           │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
forensi-link/
├── backend/
│   ├── app.py                 # Flask application + models + routes
│   ├── seed.py                # Database seeding script
│   ├── requirements.txt       # Python dependencies
│   ├── forensilink.db         # SQLite database (auto-created)
│   ├── venv/                  # Python virtual environment
│   ├── README.md              # Backend documentation
│   └── .gitignore
│
├── src/
│   ├── lib/
│   │   └── api.ts             # ⭐ API client functions
│   ├── pages/
│   │   ├── Index.tsx          # Main dashboard (updated with API)
│   │   └── Console.tsx        # Query analysis (updated with API)
│   ├── components/
│   │   ├── CaseSelector.tsx   # Case selection (updated with API)
│   │   ├── ResultsPanel.tsx   # Results display (updated with API)
│   │   └── graph/
│   │       ├── NetworkGraph.tsx
│   │       ├── ClusterLegend.tsx
│   │       ├── TemporalSlider.tsx
│   │       └── PathAnalysis.tsx
│   ├── data/
│   │   └── shadownet.ts       # Fallback static data
│   └── types/
│       └── graph.ts           # TypeScript type definitions
│
└── package.json
```

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
Response: { "status": "healthy", "message": "Forensi-Link API is running" }
```

### Cases
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cases` | Get all cases |
| GET | `/api/cases/<case_id>` | Get specific case with entities and connections |
| POST | `/api/cases` | Create new case |
| PUT | `/api/cases/<case_id>` | Update case |
| DELETE | `/api/cases/<case_id>` | Delete case |
| GET | `/api/search/cases?status=active` | Search cases with filters |

### Graph Data
```
GET /api/cases/<case_id>/graph
Response: {
  "nodes": [...],  // Array of entities
  "edges": [...]   // Array of connections
}
```

### Entities & Connections
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cases/<case_id>/entities` | Get all entities for a case |
| POST | `/api/cases/<case_id>/entities` | Create new entity |
| GET | `/api/cases/<case_id>/connections` | Get all connections for a case |
| POST | `/api/cases/<case_id>/connections` | Create new connection |

---

## 💾 Database Schema

### Cases Table
```sql
CREATE TABLE cases (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    crime_type VARCHAR(100),
    officer_id VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Entities Table (Graph Nodes)
```sql
CREATE TABLE entities (
    id VARCHAR(50) PRIMARY KEY,
    case_id VARCHAR(50) FOREIGN KEY REFERENCES cases(id),
    label VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,  -- person, phone, financial, location, keyword, organization
    size INTEGER DEFAULT 50,
    icon VARCHAR(10),
    meta_data JSON,
    timestamp DATETIME
);
```

### Connections Table (Graph Edges)
```sql
CREATE TABLE connections (
    id VARCHAR(50) PRIMARY KEY,
    case_id VARCHAR(50) FOREIGN KEY REFERENCES cases(id),
    source VARCHAR(50) NOT NULL,
    target VARCHAR(50) NOT NULL,
    type VARCHAR(100) NOT NULL,
    weight INTEGER DEFAULT 1,
    data JSON,
    timestamp DATETIME
);
```

---

## 📊 Seeded Data

### Arjun Varma Case (2025-047-VA)
- **11 Entities**: Arjun Varma, Priya S, Ravi K, Burner Phone, Crypto Wallet, ProtonMail, Café Central, The Project, The Handler, Driver M, Supplier B
- **13 Connections**: Signal chats, SMS, transactions, encrypted calls, GPS co-locations, phone calls
- **Networks**: Inner Circle (Green), Financial (Orange), Operations (Purple)

### Additional Cases
1. **2024-001** - Theft Investigation - Downtown
2. **2024-007** - Fraud Case - Financial District
3. **2023-015** - Cybercrime - Data Breach
4. **2023-092** - Narcotics Operation - Harbor
5. **2022-045** - Murder Investigation - Residential

---

## 🔄 Data Flow Examples

### Loading Case List (CaseSelector)
```typescript
// Frontend: src/components/CaseSelector.tsx
useEffect(() => {
  const fetchCases = async () => {
    const cases = await api.getCases();  // → HTTP GET /api/cases
    setAvailableCases(cases);
  };
  fetchCases();
}, []);
```

### Loading Graph Data (ResultsPanel)
```typescript
// Frontend: src/components/ResultsPanel.tsx
useEffect(() => {
  const fetchGraphData = async () => {
    const response = await api.getCaseGraph('2025-047-VA');  // → HTTP GET /api/cases/2025-047-VA/graph
    const transformedData = transformGraphData(response);
    setGraphData(transformedData);
  };
  fetchGraphData();
}, [hasResults]);
```

### Loading Console Data
```typescript
// Frontend: src/pages/Console.tsx
useEffect(() => {
  const fetchCaseData = async () => {
    const graphResponse = await api.getCaseGraph('2025-047-VA');
    const caseResponse = await api.getCase('2025-047-VA');
    setGraphData(transformGraphData(graphResponse));
    setCaseInfo(caseResponse.case);
  };
  fetchCaseData();
}, []);
```

---

## 🛠️ API Client Functions (src/lib/api.ts)

```typescript
// Main API functions
export const api = {
  health()                      // Health check
  getCases()                    // Get all cases
  getCase(caseId)              // Get specific case
  getCaseGraph(caseId)         // Get graph data
  createCase(caseData)         // Create new case
  updateCase(caseId, data)     // Update case
  deleteCase(caseId)           // Delete case
  searchCases(params)          // Search with filters
  getEntities(caseId)          // Get entities
  createEntity(caseId, data)   // Create entity
  getConnections(caseId)       // Get connections
  createConnection(caseId, data) // Create connection
};

// Data transformation
export function transformGraphData(apiResponse) {
  // Converts API response to frontend GraphData type
  // Transforms timestamp strings to Date objects
}
```

---

## 🔧 Development Workflow

### 1. Make Changes to Backend
```powershell
cd backend
# Edit app.py
python app.py  # Test changes
```

### 2. Make Changes to Frontend
```powershell
# Edit src/ files
# Hot reload automatically updates browser
```

### 3. Test Integration
- Open http://localhost:8080
- Open browser DevTools → Network tab
- See API calls to http://localhost:5000/api

### 4. Add New Case
```typescript
// Use API client
await api.createCase({
  id: "2025-100",
  title: "New Investigation",
  description: "Description here",
  status: "active",
  crime_type: "Fraud",
  officer_id: "IO-2847"
});
```

---

## 🐛 Troubleshooting

### Backend not responding
```powershell
# Check if Flask is running
curl http://localhost:5000/api/health

# Restart backend
cd backend
python app.py
```

### Frontend can't connect to backend
- Check CORS is enabled in Flask (already done)
- Verify backend URL in `src/lib/api.ts`: `http://localhost:5000/api`
- Check browser console for errors

### Database errors
```powershell
cd backend
# Reset database
python seed.py
```

---

## 📈 Next Steps

### Potential Enhancements
1. **Authentication**: Add user login/JWT tokens
2. **Real-time Updates**: WebSocket connections for live data
3. **File Upload**: Handle UFDR file parsing on backend
4. **Advanced Search**: Full-text search across cases
5. **Export**: PDF/CSV export of analysis results
6. **Visualization**: More graph layouts and filtering options
7. **Analytics**: Case statistics and trends dashboard

### Production Deployment
1. Replace SQLite with PostgreSQL
2. Use production WSGI server (Gunicorn/uWSGI)
3. Set up nginx reverse proxy
4. Add proper error handling and logging
5. Implement rate limiting
6. Add database backups

---

## 📝 Summary

✅ **Backend**: Flask REST API with SQLAlchemy + SQLite database
✅ **Frontend**: React components integrated with API client
✅ **Data Flow**: Real-time fetching from database via HTTP requests
✅ **Graph Visualization**: Dynamic loading from backend
✅ **Case Management**: Full CRUD operations available
✅ **Arjun Varma Case**: Complete network data in database

**All systems integrated and running! 🚀**
