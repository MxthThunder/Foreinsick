import { NODE_COLORS, NODE_ICONS, NodeType } from '@/types/graph';

interface ClusterLegendProps {
  activeCluster: NodeType | null;
  onClusterClick: (type: NodeType | null) => void;
  clusterCounts: Record<NodeType, number>;
  floating?: boolean; // when true, render as fixed overlay
}

const CLUSTER_LABELS: Record<NodeType, string> = {
  person: 'Inner Circle',
  phone: 'Communication Devices',
  financial: 'Financial Network',
  location: 'Physical Locations',
  keyword: 'Keywords & Concepts',
  organization: 'Operations Network'
};

export default function ClusterLegend({ activeCluster, onClusterClick, clusterCounts, floating = false }: ClusterLegendProps) {
  const containerClass = floating
    ? 'fixed top-6 left-6 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-40 p-4 w-72'
    : 'bg-card rounded-lg border p-4 w-full';

  return (
    <div className={containerClass}>
      <h3 className="text-lg font-semibold text-[#333333] mb-4 uppercase tracking-wide">Network Clusters</h3>

      <div className="space-y-2">
        {(Object.keys(NODE_COLORS) as NodeType[]).map((type) => {
          const isActive = activeCluster === type;
          const count = clusterCounts[type] || 0;

          return (
            <button
              key={type}
              onClick={() => onClusterClick(isActive ? null : type)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#FF9AA2] shadow-md transform scale-105'
                  : 'bg-[#F8F8F8] hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs"
                  style={{ backgroundColor: NODE_COLORS[type] }}
                >
                  {NODE_ICONS[type]}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-[#333333]'}`}>
                  {CLUSTER_LABELS[type]}
                </span>
              </div>
              <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {activeCluster && (
        <button
          onClick={() => onClusterClick(null)}
          className="w-full mt-3 py-2 text-sm text-[#FF9AA2] hover:text-[#FF8A94] font-medium transition-colors"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
}
