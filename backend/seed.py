from app import app, db, Case, Entity, Connection
from datetime import datetime

def seed_database():
    """Seed the database with the Arjun Varma case data"""
    
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        print("Creating Arjun Varma case...")
        
        # Create the Arjun Varma case
        varma_case = Case(
            id='2025-047-VA',
            title='Case 47-VA: Varma Network Analysis',
            description='Investigation into Arjun Varma network involving conspiracy, financial transactions, and coordinated operations across multiple networks.',
            status='active',
            crime_type='Conspiracy / Financial Fraud',
            officer_id='IO-2847'
        )
        db.session.add(varma_case)
        
        # Create entities (nodes)
        entities_data = [
            {
                'id': 'arjun',
                'label': 'Arjun Varma',
                'type': 'person',
                'size': 100,
                'icon': '👤',
                'metadata': {
                    'role': 'Primary Suspect',
                    'status': 'Core Coordinator',
                    'interactions': 8542
                }
            },
            {
                'id': 'priya',
                'label': 'Priya S',
                'type': 'person',
                'size': 75,
                'icon': '👤',
                'metadata': {
                    'role': 'Inner Circle',
                    'interactions': 3420
                },
                'timestamp': datetime(2025, 3, 1)
            },
            {
                'id': 'ravi',
                'label': 'Ravi K',
                'type': 'person',
                'size': 70,
                'icon': '👤',
                'metadata': {
                    'role': 'Inner Circle',
                    'interactions': 2890
                },
                'timestamp': datetime(2025, 3, 1)
            },
            {
                'id': 'burner',
                'label': 'Burner Phone',
                'type': 'phone',
                'size': 65,
                'icon': '📱',
                'metadata': {
                    'imei': 'REDACTED',
                    'firstSeen': '2025-03-15',
                    'role': 'Critical Bridge'
                },
                'timestamp': datetime(2025, 3, 15)
            },
            {
                'id': 'wallet',
                'label': 'Crypto Wallet X123',
                'type': 'financial',
                'size': 60,
                'icon': '💰',
                'metadata': {
                    'address': 'bc1q...x123',
                    'totalTransactions': 47,
                    'role': 'Financial Network'
                },
                'timestamp': datetime(2025, 3, 10)
            },
            {
                'id': 'protonmail',
                'label': 'proton.me Account',
                'type': 'financial',
                'size': 50,
                'icon': '💰',
                'metadata': {
                    'email': 'shadow***@proton.me',
                    'role': 'Secure Comms'
                },
                'timestamp': datetime(2025, 3, 8)
            },
            {
                'id': 'cafe',
                'label': 'Café Central',
                'type': 'location',
                'size': 45,
                'icon': '📍',
                'metadata': {
                    'coordinates': '19.0760°N, 72.8777°E',
                    'role': 'Physical Meeting Point'
                },
                'timestamp': datetime(2025, 3, 20)
            },
            {
                'id': 'project',
                'label': 'The Project',
                'type': 'keyword',
                'size': 55,
                'icon': '🔑',
                'metadata': {
                    'mentions': 23,
                    'role': 'Operation Codename'
                },
                'timestamp': datetime(2025, 3, 17)
            },
            {
                'id': 'handler',
                'label': 'The Handler',
                'type': 'organization',
                'size': 58,
                'icon': '🏢',
                'metadata': {
                    'role': 'Operations Network',
                    'status': 'Unknown Identity'
                },
                'timestamp': datetime(2025, 3, 20)
            },
            {
                'id': 'driver',
                'label': 'Driver M',
                'type': 'organization',
                'size': 48,
                'icon': '🏢',
                'metadata': {
                    'role': 'Logistics',
                    'vehicleId': 'MH02-XX-1234'
                },
                'timestamp': datetime(2025, 3, 20)
            },
            {
                'id': 'supplier',
                'label': 'Supplier B',
                'type': 'organization',
                'size': 52,
                'icon': '🏢',
                'metadata': {
                    'role': 'Operations Network'
                },
                'timestamp': datetime(2025, 3, 22)
            }
        ]
        
        for entity_data in entities_data:
            entity = Entity(
                id=entity_data['id'],
                case_id='2025-047-VA',
                label=entity_data['label'],
                type=entity_data['type'],
                size=entity_data['size'],
                icon=entity_data['icon'],
                meta_data=entity_data['metadata'],
                timestamp=entity_data.get('timestamp')
            )
            db.session.add(entity)
        
        # Create connections (edges)
        connections_data = [
            {
                'id': 'e1',
                'source': 'arjun',
                'target': 'priya',
                'type': 'Signal Chat',
                'weight': 3420,
                'data': {
                    'snippet': 'Thousands of interactions. Inner circle trust.',
                    'frequency': 'Daily'
                },
                'timestamp': datetime(2025, 3, 1)
            },
            {
                'id': 'e2',
                'source': 'arjun',
                'target': 'ravi',
                'type': 'Signal Chat',
                'weight': 2890,
                'data': {
                    'snippet': 'Constant communication. Planning coordination.',
                    'frequency': 'Daily'
                },
                'timestamp': datetime(2025, 3, 1)
            },
            {
                'id': 'e3',
                'source': 'arjun',
                'target': 'burner',
                'type': 'SMS',
                'weight': 450,
                'data': {
                    'snippet': 'Operational commands routed through device.',
                    'frequency': 'Frequent'
                },
                'timestamp': datetime(2025, 3, 15)
            },
            {
                'id': 'e4',
                'source': 'arjun',
                'target': 'wallet',
                'type': 'Transaction',
                'weight': 15,
                'data': {
                    'snippet': 'Initial funding traced to primary account.',
                    'totalAmount': '12.5 BTC'
                },
                'timestamp': datetime(2025, 3, 10)
            },
            {
                'id': 'e5',
                'source': 'burner',
                'target': 'wallet',
                'type': 'Transaction',
                'weight': 15,
                'data': {
                    'snippet': '15 transactions labeled "Key Drop"',
                    'role': 'Critical Bridge'
                },
                'timestamp': datetime(2025, 3, 18)
            },
            {
                'id': 'e6',
                'source': 'burner',
                'target': 'handler',
                'type': 'Encrypted Call',
                'weight': 32,
                'data': {
                    'snippet': 'Bridge to operations network. Handler coordination.',
                    'duration': '847 minutes total'
                },
                'timestamp': datetime(2025, 3, 20)
            },
            {
                'id': 'e7',
                'source': 'wallet',
                'target': 'protonmail',
                'type': 'Payment Receipt',
                'weight': 8,
                'data': {
                    'snippet': 'Payment confirmations via encrypted email.',
                    'frequency': 'Weekly'
                },
                'timestamp': datetime(2025, 3, 12)
            },
            {
                'id': 'e8',
                'source': 'arjun',
                'target': 'project',
                'type': 'Keyword Mention',
                'weight': 23,
                'data': {
                    'snippet': 'Operation codename appears in encrypted chats.',
                    'context': 'Conceptualization Phase'
                },
                'timestamp': datetime(2025, 3, 17)
            },
            {
                'id': 'e9',
                'source': 'burner',
                'target': 'project',
                'type': 'Keyword Mention',
                'weight': 12,
                'data': {
                    'snippet': 'Project references in operational messages.',
                    'context': 'Activation Phase'
                },
                'timestamp': datetime(2025, 3, 17)
            },
            {
                'id': 'e10',
                'source': 'ravi',
                'target': 'cafe',
                'type': 'GPS Co-location',
                'weight': 3,
                'data': {
                    'snippet': 'GPS: 19.0760°N, 72.8777°E at 2025-03-20 14:23',
                    'duration': '47 minutes'
                },
                'timestamp': datetime(2025, 3, 20)
            },
            {
                'id': 'e11',
                'source': 'driver',
                'target': 'cafe',
                'type': 'GPS Co-location',
                'weight': 3,
                'data': {
                    'snippet': 'GPS: 19.0760°N, 72.8777°E at 2025-03-20 14:23',
                    'duration': '47 minutes',
                    'evidence': 'Physical Proof of Meeting'
                },
                'timestamp': datetime(2025, 3, 20)
            },
            {
                'id': 'e12',
                'source': 'handler',
                'target': 'driver',
                'type': 'Phone Call',
                'weight': 18,
                'data': {
                    'snippet': 'Logistics coordination calls.',
                    'frequency': 'Regular'
                },
                'timestamp': datetime(2025, 3, 20)
            },
            {
                'id': 'e13',
                'source': 'handler',
                'target': 'supplier',
                'type': 'Phone Call',
                'weight': 25,
                'data': {
                    'snippet': 'Supply chain management communications.',
                    'frequency': 'Regular'
                },
                'timestamp': datetime(2025, 3, 22)
            }
        ]
        
        for conn_data in connections_data:
            connection = Connection(
                id=conn_data['id'],
                case_id='2025-047-VA',
                source=conn_data['source'],
                target=conn_data['target'],
                type=conn_data['type'],
                weight=conn_data['weight'],
                data=conn_data['data'],
                timestamp=conn_data['timestamp']
            )
            db.session.add(connection)
        
        # Add some additional mock cases
        additional_cases = [
            {
                'id': '2024-001',
                'title': 'Theft Investigation - Downtown',
                'description': 'Series of coordinated thefts in downtown area',
                'status': 'closed',
                'crime_type': 'Theft',
                'officer_id': 'IO-1523'
            },
            {
                'id': '2024-007',
                'title': 'Fraud Case - Financial District',
                'description': 'Financial fraud investigation involving multiple entities',
                'status': 'active',
                'crime_type': 'Fraud',
                'officer_id': 'IO-2847'
            },
            {
                'id': '2023-015',
                'title': 'Cybercrime - Data Breach',
                'description': 'Large scale data breach investigation',
                'status': 'active',
                'crime_type': 'Cybercrime',
                'officer_id': 'IO-3421'
            },
            {
                'id': '2023-092',
                'title': 'Narcotics Operation - Harbor',
                'description': 'Drug trafficking network at the harbor',
                'status': 'active',
                'crime_type': 'Narcotics',
                'officer_id': 'IO-2847'
            },
            {
                'id': '2022-045',
                'title': 'Murder Investigation - Residential',
                'description': 'Homicide investigation in residential area',
                'status': 'closed',
                'crime_type': 'Homicide',
                'officer_id': 'IO-4521'
            }
        ]
        
        for case_data in additional_cases:
            case = Case(**case_data)
            db.session.add(case)
        
        # Commit all changes
        db.session.commit()
        
        print("✅ Database seeded successfully!")
        print(f"   - Created {len(entities_data)} entities")
        print(f"   - Created {len(connections_data)} connections")
        print(f"   - Created {len(additional_cases) + 1} cases")

if __name__ == '__main__':
    seed_database()
