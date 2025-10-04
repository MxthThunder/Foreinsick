# Forensi-Link Backend

Flask-based REST API for the Forensi-Link forensic analysis platform.

## Features

- **SQLite Database**: Lightweight database for storing cases, entities, and connections
- **REST API**: Complete CRUD operations for cases, entities, and connections
- **CORS Enabled**: Ready for frontend integration
- **Graph Data**: Structured data format for network visualization

## Database Schema

### Tables

1. **cases** - Forensic investigation cases
   - id, title, description, status, crime_type, officer_id, timestamps

2. **entities** - Network nodes (people, phones, locations, etc.)
   - id, case_id, label, type, size, icon, metadata, timestamp

3. **connections** - Network edges (relationships between entities)
   - id, case_id, source, target, type, weight, data, timestamp

## Setup

### 1. Create Virtual Environment

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 3. Initialize Database

```powershell
python seed.py
```

This will create the database and populate it with:
- Arjun Varma case (Case 47-VA) with 11 entities and 13 connections
- 5 additional mock cases

### 4. Run Server

```powershell
python app.py
```

Server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Cases
- `GET /api/cases` - Get all cases
- `GET /api/cases/<case_id>` - Get specific case with entities and connections
- `POST /api/cases` - Create new case
- `PUT /api/cases/<case_id>` - Update case
- `DELETE /api/cases/<case_id>` - Delete case
- `GET /api/search/cases?status=active&crime_type=Fraud` - Search cases

### Entities (Nodes)
- `GET /api/cases/<case_id>/entities` - Get all entities for a case
- `POST /api/cases/<case_id>/entities` - Create new entity

### Connections (Edges)
- `GET /api/cases/<case_id>/connections` - Get all connections for a case
- `POST /api/cases/<case_id>/connections` - Create new connection

### Graph Data
- `GET /api/cases/<case_id>/graph` - Get complete graph data (nodes + edges)

## Example Requests

### Get Arjun Varma Case Graph

```bash
curl http://localhost:5000/api/cases/2025-047-VA/graph
```

### Get All Active Cases

```bash
curl http://localhost:5000/api/search/cases?status=active
```

### Create New Case

```bash
curl -X POST http://localhost:5000/api/cases \
  -H "Content-Type: application/json" \
  -d '{
    "id": "2025-100",
    "title": "New Investigation",
    "description": "Description here",
    "status": "active",
    "crime_type": "Fraud",
    "officer_id": "IO-2847"
  }'
```

## Frontend Integration

Update your frontend to fetch data from the API:

```typescript
// Example: Fetch case graph data
const response = await fetch('http://localhost:5000/api/cases/2025-047-VA/graph');
const graphData = await response.json();
```

## Database Location

The SQLite database file is created at: `backend/forensilink.db`

## Development

- Python 3.8+
- Flask 3.0.0
- SQLAlchemy for ORM
- CORS enabled for frontend communication
