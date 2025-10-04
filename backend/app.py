from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'forensilink.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Case(db.Model):
    __tablename__ = 'cases'
    
    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(50), default='active')
    crime_type = db.Column(db.String(100))
    officer_id = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    entities = db.relationship('Entity', backref='case', lazy=True, cascade='all, delete-orphan')
    connections = db.relationship('Connection', backref='case', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'crime_type': self.crime_type,
            'officer_id': self.officer_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Entity(db.Model):
    __tablename__ = 'entities'
    
    id = db.Column(db.String(50), primary_key=True)
    case_id = db.Column(db.String(50), db.ForeignKey('cases.id'), nullable=False)
    label = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # person, phone, financial, location, keyword, organization
    size = db.Column(db.Integer, default=50)
    icon = db.Column(db.String(10))
    meta_data = db.Column(db.JSON)
    timestamp = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'case_id': self.case_id,
            'label': self.label,
            'type': self.type,
            'size': self.size,
            'icon': self.icon,
            'metadata': self.meta_data,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

class Connection(db.Model):
    __tablename__ = 'connections'
    
    id = db.Column(db.String(50), primary_key=True)
    case_id = db.Column(db.String(50), db.ForeignKey('cases.id'), nullable=False)
    source = db.Column(db.String(50), nullable=False)
    target = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Integer, default=1)
    data = db.Column(db.JSON)
    timestamp = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'case_id': self.case_id,
            'source': self.source,
            'target': self.target,
            'type': self.type,
            'weight': self.weight,
            'data': self.data,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Forensi-Link API is running'})

@app.route('/api/cases', methods=['GET'])
def get_cases():
    """Get all cases"""
    cases = Case.query.all()
    return jsonify([case.to_dict() for case in cases])

@app.route('/api/cases/<case_id>', methods=['GET'])
def get_case(case_id):
    """Get a specific case with its entities and connections"""
    case = Case.query.get_or_404(case_id)
    entities = Entity.query.filter_by(case_id=case_id).all()
    connections = Connection.query.filter_by(case_id=case_id).all()
    
    return jsonify({
        'case': case.to_dict(),
        'entities': [entity.to_dict() for entity in entities],
        'connections': [conn.to_dict() for conn in connections]
    })

@app.route('/api/cases', methods=['POST'])
def create_case():
    """Create a new case"""
    data = request.json
    
    case = Case(
        id=data['id'],
        title=data['title'],
        description=data.get('description'),
        status=data.get('status', 'active'),
        crime_type=data.get('crime_type'),
        officer_id=data.get('officer_id')
    )
    
    db.session.add(case)
    db.session.commit()
    
    return jsonify(case.to_dict()), 201

@app.route('/api/cases/<case_id>', methods=['PUT'])
def update_case(case_id):
    """Update a case"""
    case = Case.query.get_or_404(case_id)
    data = request.json
    
    case.title = data.get('title', case.title)
    case.description = data.get('description', case.description)
    case.status = data.get('status', case.status)
    case.crime_type = data.get('crime_type', case.crime_type)
    case.officer_id = data.get('officer_id', case.officer_id)
    
    db.session.commit()
    
    return jsonify(case.to_dict())

@app.route('/api/cases/<case_id>', methods=['DELETE'])
def delete_case(case_id):
    """Delete a case"""
    case = Case.query.get_or_404(case_id)
    db.session.delete(case)
    db.session.commit()
    
    return jsonify({'message': 'Case deleted successfully'}), 200

@app.route('/api/cases/<case_id>/entities', methods=['GET'])
def get_entities(case_id):
    """Get all entities for a case"""
    entities = Entity.query.filter_by(case_id=case_id).all()
    return jsonify([entity.to_dict() for entity in entities])

@app.route('/api/cases/<case_id>/entities', methods=['POST'])
def create_entity(case_id):
    """Create a new entity for a case"""
    data = request.json
    
    entity = Entity(
        id=data['id'],
        case_id=case_id,
        label=data['label'],
        type=data['type'],
        size=data.get('size', 50),
        icon=data.get('icon'),
        meta_data=data.get('metadata'),
        timestamp=datetime.fromisoformat(data['timestamp']) if data.get('timestamp') else None
    )
    
    db.session.add(entity)
    db.session.commit()
    
    return jsonify(entity.to_dict()), 201

@app.route('/api/cases/<case_id>/connections', methods=['GET'])
def get_connections(case_id):
    """Get all connections for a case"""
    connections = Connection.query.filter_by(case_id=case_id).all()
    return jsonify([conn.to_dict() for conn in connections])

@app.route('/api/cases/<case_id>/connections', methods=['POST'])
def create_connection(case_id):
    """Create a new connection for a case"""
    data = request.json
    
    connection = Connection(
        id=data['id'],
        case_id=case_id,
        source=data['source'],
        target=data['target'],
        type=data['type'],
        weight=data.get('weight', 1),
        data=data.get('data'),
        timestamp=datetime.fromisoformat(data['timestamp']) if data.get('timestamp') else None
    )
    
    db.session.add(connection)
    db.session.commit()
    
    return jsonify(connection.to_dict()), 201

@app.route('/api/cases/<case_id>/graph', methods=['GET'])
def get_case_graph(case_id):
    """Get the complete graph data for a case (nodes and edges)"""
    entities = Entity.query.filter_by(case_id=case_id).all()
    connections = Connection.query.filter_by(case_id=case_id).all()
    
    return jsonify({
        'nodes': [entity.to_dict() for entity in entities],
        'edges': [conn.to_dict() for conn in connections]
    })

@app.route('/api/search/cases', methods=['GET'])
def search_cases():
    """Search cases by various criteria"""
    query = Case.query
    
    # Filter by status
    status = request.args.get('status')
    if status:
        query = query.filter_by(status=status)
    
    # Filter by crime type
    crime_type = request.args.get('crime_type')
    if crime_type:
        query = query.filter_by(crime_type=crime_type)
    
    # Filter by officer
    officer_id = request.args.get('officer_id')
    if officer_id:
        query = query.filter_by(officer_id=officer_id)
    
    # Search by title
    search = request.args.get('search')
    if search:
        query = query.filter(Case.title.contains(search))
    
    cases = query.all()
    return jsonify([case.to_dict() for case in cases])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")
    
    app.run(debug=True, port=5000)
