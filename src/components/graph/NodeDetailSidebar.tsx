import { X } from 'lucide-react';
import { GraphNode } from '@/types/graph';

interface NodeDetailSidebarProps {
  node: GraphNode | null;
  onClose: () => void;
}

export default function NodeDetailSidebar({ node, onClose }: NodeDetailSidebarProps) {
  if (!node) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto border-l-4 border-[#FF9AA2]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{node.icon}</span>
            <div>
              <h2 className="text-2xl font-semibold text-[#333333]">{node.label}</h2>
              <p className="text-sm text-gray-500 uppercase tracking-wide">{node.type}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#FF9AA2] transition-colors"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-[#F8F8F8] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#333333] mb-3 uppercase tracking-wide">Node Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">ID:</dt>
                <dd className="text-sm font-medium text-[#333333]">{node.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Size:</dt>
                <dd className="text-sm font-medium text-[#333333]">{node.size}</dd>
              </div>
              {node.timestamp && (
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">First Seen:</dt>
                  <dd className="text-sm font-medium text-[#333333]">
                    {node.timestamp.toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="bg-[#F8F8F8] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#333333] mb-3 uppercase tracking-wide">Metadata</h3>
            <dl className="space-y-2">
              {Object.entries(node.metadata).map(([key, value]) => (
                <div key={key} className="flex justify-between items-start">
                  <dt className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</dt>
                  <dd className="text-sm font-medium text-[#333333] text-right max-w-[60%]">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
