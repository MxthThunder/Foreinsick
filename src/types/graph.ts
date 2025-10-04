export type NodeType = 'person' | 'phone' | 'financial' | 'location' | 'keyword' | 'organization';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  size: number;
  icon: string;
  metadata: Record<string, any>;
  timestamp?: Date;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  weight: number;
  data: Record<string, any>;
  timestamp?: Date;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const NODE_COLORS: Record<NodeType, string> = {
  person: '#BDECB6',
  phone: '#FFEB99',
  financial: '#FFAD73',
  location: '#FFB3B8',
  keyword: '#ADD8E6',
  organization: '#D3C9D5'
};

export const NODE_ICONS: Record<NodeType, string> = {
  person: '👤',
  phone: '📱',
  financial: '💰',
  location: '📍',
  keyword: '🔑',
  organization: '🏢'
};
