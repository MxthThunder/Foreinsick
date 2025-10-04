import { X } from 'lucide-react';
import { GraphEdge } from '@/types/graph';

interface EdgeDetailPopupProps {
  edge: GraphEdge | null;
  position: { x: number; y: number } | null;
  onClose: () => void;
}

export default function EdgeDetailPopup({ edge, position, onClose }: EdgeDetailPopupProps) {
  if (!edge || !position) return null;

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-2xl border-2 border-[#FF9AA2] p-4 w-80"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%) translateY(-10px)'
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#333333]">Connection Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-[#FF9AA2] transition-colors"
          aria-label="Close popup"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Type</p>
          <p className="text-sm font-medium text-[#333333]">{edge.type}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Interaction Count</p>
          <p className="text-sm font-medium text-[#333333]">{edge.weight} interactions</p>
        </div>

        {edge.timestamp && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</p>
            <p className="text-sm font-medium text-[#333333]">{edge.timestamp.toLocaleDateString()}</p>
          </div>
        )}

        {edge.data.snippet && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Evidence Snippet</p>
            <p className="text-sm text-[#333333] italic bg-[#F8F8F8] p-2 rounded">
              "{edge.data.snippet}"
            </p>
          </div>
        )}

        {Object.entries(edge.data)
          .filter(([key]) => key !== 'snippet')
          .map(([key, value]) => (
            <div key={key}>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm font-medium text-[#333333]">{String(value)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
