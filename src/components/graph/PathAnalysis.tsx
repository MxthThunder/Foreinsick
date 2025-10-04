import { Search } from 'lucide-react';
import { useState } from 'react';
import { GraphData } from '@/types/graph';

interface PathAnalysisProps {
  data: GraphData;
  onPathRequest: (source: string, target: string) => void;
  onClearPath: () => void;
  floating?: boolean;
}

export default function PathAnalysis({ data, onPathRequest, onClearPath, floating = false }: PathAnalysisProps) {
  const [source, setSource] = useState('wallet');
  const [target, setTarget] = useState('handler');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAnalyze = () => {
    if (source && target) {
      onPathRequest(source, target);
    }
  };

  const containerClass = floating
    ? 'fixed top-6 right-6 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-40 w-80'
    : 'bg-card rounded-lg border p-0 w-full';

  return (
    <div className={containerClass}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Search size={18} className="text-[#FF9AA2]" />
          <h3 className="text-lg font-semibold text-[#333333] uppercase tracking-wide">Path Analysis</h3>
        </div>
        <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1 uppercase tracking-wide">Source Node</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#FF9AA2]"
            >
              {data.nodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1 uppercase tracking-wide">Target Node</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#FF9AA2]"
            >
              {data.nodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full py-2 bg-[#FF9AA2] text-white font-medium rounded-lg hover:bg-[#FF8A94] transition-colors"
          >
            Find Shortest Path
          </button>

          <button
            onClick={onClearPath}
            className="w-full py-2 bg-[#F8F8F8] text-[#333333] font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Highlight
          </button>

          <div className="mt-4 p-3 bg-[#FFF5F5] rounded-lg border border-[#FFE0E2]">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-[#333333]">Critical Bridge:</span> The shortest path between
              Crypto Wallet X123 and The Handler passes through the Burner Phone, revealing the key intermediary
              in the operation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
