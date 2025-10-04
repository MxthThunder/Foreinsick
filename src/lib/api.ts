// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// API utility functions
export const api = {
  // Health check
  async health() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  // Cases
  async getCases() {
    const response = await fetch(`${API_BASE_URL}/cases`);
    if (!response.ok) throw new Error('Failed to fetch cases');
    return response.json();
  },

  async getCase(caseId: string) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}`);
    if (!response.ok) throw new Error(`Failed to fetch case ${caseId}`);
    return response.json();
  },

  async getCaseGraph(caseId: string) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/graph`);
    if (!response.ok) throw new Error(`Failed to fetch graph for case ${caseId}`);
    return response.json();
  },

  async createCase(caseData: {
    id: string;
    title: string;
    description?: string;
    status?: string;
    crime_type?: string;
    officer_id?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caseData),
    });
    if (!response.ok) throw new Error('Failed to create case');
    return response.json();
  },

  async updateCase(caseId: string, caseData: Partial<{
    title: string;
    description: string;
    status: string;
    crime_type: string;
    officer_id: string;
  }>) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caseData),
    });
    if (!response.ok) throw new Error(`Failed to update case ${caseId}`);
    return response.json();
  },

  async deleteCase(caseId: string) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete case ${caseId}`);
    return response.json();
  },

  // Search cases
  async searchCases(params?: {
    status?: string;
    crime_type?: string;
    officer_id?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.crime_type) queryParams.append('crime_type', params.crime_type);
    if (params?.officer_id) queryParams.append('officer_id', params.officer_id);
    if (params?.search) queryParams.append('search', params.search);

    const url = `${API_BASE_URL}/search/cases${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to search cases');
    return response.json();
  },

  // Entities
  async getEntities(caseId: string) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/entities`);
    if (!response.ok) throw new Error(`Failed to fetch entities for case ${caseId}`);
    return response.json();
  },

  async createEntity(caseId: string, entityData: {
    id: string;
    label: string;
    type: string;
    size?: number;
    icon?: string;
    metadata?: any;
    timestamp?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/entities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entityData),
    });
    if (!response.ok) throw new Error('Failed to create entity');
    return response.json();
  },

  // Connections
  async getConnections(caseId: string) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/connections`);
    if (!response.ok) throw new Error(`Failed to fetch connections for case ${caseId}`);
    return response.json();
  },

  async createConnection(caseId: string, connectionData: {
    id: string;
    source: string;
    target: string;
    type: string;
    weight?: number;
    data?: any;
    timestamp?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/connections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(connectionData),
    });
    if (!response.ok) throw new Error('Failed to create connection');
    return response.json();
  },
};

// Transform API response to match frontend GraphData type
export function transformGraphData(apiResponse: any) {
  return {
    nodes: apiResponse.nodes.map((node: any) => ({
      id: node.id,
      label: node.label,
      type: node.type,
      size: node.size,
      icon: node.icon,
      metadata: node.metadata,
      timestamp: node.timestamp ? new Date(node.timestamp) : undefined,
    })),
    edges: apiResponse.edges.map((edge: any) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      weight: edge.weight,
      data: edge.data,
      timestamp: edge.timestamp ? new Date(edge.timestamp) : undefined,
    })),
  };
}
