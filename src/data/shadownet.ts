import { GraphData } from '@/types/graph';

export const shadowNetData: GraphData = {
  nodes: [
    {
      id: 'arjun',
      label: 'Arjun Varma',
      type: 'person',
      size: 100,
      icon: '👤',
      metadata: {
        role: 'Primary Suspect',
        status: 'Core Coordinator',
        interactions: 8542
      }
    },
    {
      id: 'priya',
      label: 'Priya S',
      type: 'person',
      size: 75,
      icon: '👤',
      metadata: {
        role: 'Inner Circle',
        interactions: 3420
      },
      timestamp: new Date('2025-03-01')
    },
    {
      id: 'ravi',
      label: 'Ravi K',
      type: 'person',
      size: 70,
      icon: '👤',
      metadata: {
        role: 'Inner Circle',
        interactions: 2890
      },
      timestamp: new Date('2025-03-01')
    },
    {
      id: 'burner',
      label: 'Burner Phone',
      type: 'phone',
      size: 65,
      icon: '📱',
      metadata: {
        imei: 'REDACTED',
        firstSeen: '2025-03-15',
        role: 'Critical Bridge'
      },
      timestamp: new Date('2025-03-15')
    },
    {
      id: 'wallet',
      label: 'Crypto Wallet X123',
      type: 'financial',
      size: 60,
      icon: '💰',
      metadata: {
        address: 'bc1q...x123',
        totalTransactions: 47,
        role: 'Financial Network'
      },
      timestamp: new Date('2025-03-10')
    },
    {
      id: 'protonmail',
      label: 'proton.me Account',
      type: 'financial',
      size: 50,
      icon: '💰',
      metadata: {
        email: 'shadow***@proton.me',
        role: 'Secure Comms'
      },
      timestamp: new Date('2025-03-08')
    },
    {
      id: 'cafe',
      label: 'Café Central',
      type: 'location',
      size: 45,
      icon: '📍',
      metadata: {
        coordinates: '19.0760°N, 72.8777°E',
        role: 'Physical Meeting Point'
      },
      timestamp: new Date('2025-03-20')
    },
    {
      id: 'project',
      label: 'The Project',
      type: 'keyword',
      size: 55,
      icon: '🔑',
      metadata: {
        mentions: 23,
        role: 'Operation Codename'
      },
      timestamp: new Date('2025-03-17')
    },
    {
      id: 'handler',
      label: 'The Handler',
      type: 'organization',
      size: 58,
      icon: '🏢',
      metadata: {
        role: 'Operations Network',
        status: 'Unknown Identity'
      },
      timestamp: new Date('2025-03-20')
    },
    {
      id: 'driver',
      label: 'Driver M',
      type: 'organization',
      size: 48,
      icon: '🏢',
      metadata: {
        role: 'Logistics',
        vehicleId: 'MH02-XX-1234'
      },
      timestamp: new Date('2025-03-20')
    },
    {
      id: 'supplier',
      label: 'Supplier B',
      type: 'organization',
      size: 52,
      icon: '🏢',
      metadata: {
        role: 'Operations Network'
      },
      timestamp: new Date('2025-03-22')
    }
  ],
  edges: [
    {
      id: 'e1',
      source: 'arjun',
      target: 'priya',
      type: 'Signal Chat',
      weight: 3420,
      data: {
        snippet: 'Thousands of interactions. Inner circle trust.',
        frequency: 'Daily'
      },
      timestamp: new Date('2025-03-01')
    },
    {
      id: 'e2',
      source: 'arjun',
      target: 'ravi',
      type: 'Signal Chat',
      weight: 2890,
      data: {
        snippet: 'Constant communication. Planning coordination.',
        frequency: 'Daily'
      },
      timestamp: new Date('2025-03-01')
    },
    {
      id: 'e3',
      source: 'arjun',
      target: 'burner',
      type: 'SMS',
      weight: 450,
      data: {
        snippet: 'Operational commands routed through device.',
        frequency: 'Frequent'
      },
      timestamp: new Date('2025-03-15')
    },
    {
      id: 'e4',
      source: 'arjun',
      target: 'wallet',
      type: 'Transaction',
      weight: 15,
      data: {
        snippet: 'Initial funding traced to primary account.',
        totalAmount: '12.5 BTC'
      },
      timestamp: new Date('2025-03-10')
    },
    {
      id: 'e5',
      source: 'burner',
      target: 'wallet',
      type: 'Transaction',
      weight: 15,
      data: {
        snippet: '15 transactions labeled "Key Drop"',
        role: 'Critical Bridge'
      },
      timestamp: new Date('2025-03-18')
    },
    {
      id: 'e6',
      source: 'burner',
      target: 'handler',
      type: 'Encrypted Call',
      weight: 32,
      data: {
        snippet: 'Bridge to operations network. Handler coordination.',
        duration: '847 minutes total'
      },
      timestamp: new Date('2025-03-20')
    },
    {
      id: 'e7',
      source: 'wallet',
      target: 'protonmail',
      type: 'Payment Receipt',
      weight: 8,
      data: {
        snippet: 'Payment confirmations via encrypted email.',
        frequency: 'Weekly'
      },
      timestamp: new Date('2025-03-12')
    },
    {
      id: 'e8',
      source: 'arjun',
      target: 'project',
      type: 'Keyword Mention',
      weight: 23,
      data: {
        snippet: 'Operation codename appears in encrypted chats.',
        context: 'Conceptualization Phase'
      },
      timestamp: new Date('2025-03-17')
    },
    {
      id: 'e9',
      source: 'burner',
      target: 'project',
      type: 'Keyword Mention',
      weight: 12,
      data: {
        snippet: 'Project references in operational messages.',
        context: 'Activation Phase'
      },
      timestamp: new Date('2025-03-17')
    },
    {
      id: 'e10',
      source: 'ravi',
      target: 'cafe',
      type: 'GPS Co-location',
      weight: 3,
      data: {
        snippet: 'GPS: 19.0760°N, 72.8777°E at 2025-03-20 14:23',
        duration: '47 minutes'
      },
      timestamp: new Date('2025-03-20')
    },
    {
      id: 'e11',
      source: 'driver',
      target: 'cafe',
      type: 'GPS Co-location',
      weight: 3,
      data: {
        snippet: 'GPS: 19.0760°N, 72.8777°E at 2025-03-20 14:23',
        duration: '47 minutes',
        evidence: 'Physical Proof of Meeting'
      },
      timestamp: new Date('2025-03-20')
    },
    {
      id: 'e12',
      source: 'handler',
      target: 'driver',
      type: 'Phone Call',
      weight: 18,
      data: {
        snippet: 'Logistics coordination calls.',
        frequency: 'Regular'
      },
      timestamp: new Date('2025-03-20')
    },
    {
      id: 'e13',
      source: 'handler',
      target: 'supplier',
      type: 'Phone Call',
      weight: 25,
      data: {
        snippet: 'Supply chain management communications.',
        frequency: 'Regular'
      },
      timestamp: new Date('2025-03-22')
    }
  ]
};
