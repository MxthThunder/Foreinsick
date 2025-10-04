import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { shadowNetData } from "@/data/shadownet";

const Console = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setShowResults(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 3000);
  };

  // Generate transaction data from actual shadownet edges
  const transactionData = shadowNetData.edges.slice(0, 4).map((edge, idx) => ({
    id: edge.id.toUpperCase(),
    timestamp: edge.timestamp?.toISOString().replace('T', ' ').split('.')[0] + ' UTC' || 'N/A',
    protocol: edge.type,
    alias: shadowNetData.nodes.find(n => n.id === edge.target)?.label || edge.target,
    confidence: 0.85 + Math.random() * 0.13, // Random confidence between 0.85-0.98
    snippet: edge.data?.snippet || 'Data connection detected.'
  }));

  // Calculate actual statistics from shadownet data
  const totalNodes = shadowNetData.nodes.length;
  const totalEdges = shadowNetData.edges.length;
  const totalInteractions = shadowNetData.edges.reduce((sum, edge) => sum + (edge.weight || 0), 0);
  
  // Find burner phone node
  const burnerNode = shadowNetData.nodes.find(n => n.id === 'burner');
  const burnerConnections = shadowNetData.edges.filter(e => 
    e.source === 'burner' || e.target === 'burner'
  ).length;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8 shadow-2xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Main
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Case 47-VA: Varma Network Analysis Console
          </h1>
          <div className="h-1 w-24 bg-primary rounded-full"></div>
        </div>

        {/* Query Input Section */}
        <div id="query-input-section" className="mb-6">
          {/* Operational Parameters */}
          <div className="mb-6 p-4 border-l-4 border-primary bg-secondary/50 rounded">
            <h2 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
              Current Operational Parameters
            </h2>
            <div className="space-y-1 text-sm text-foreground/80 font-mono">
              <p>Target File Loaded: <span className="text-primary font-semibold">Arjun-Phone-Seizure-1.UFDR</span></p>
              <p>Records Indexed: <span className="font-semibold">{totalInteractions.toLocaleString()}</span></p>
              <p>Engine Status: <span className="text-success font-semibold">Optimal (Graph Ready)</span></p>
            </div>
          </div>

          {/* Network State */}
          <div className="mb-4 p-3 bg-warning/10 border border-warning/30 rounded">
            <h3 className="text-xs font-semibold text-warning mb-1 uppercase">Network State</h3>
            <p className="text-sm text-foreground/80 italic">
              Active Networks Identified: Inner Circle (Green), Financial (Orange), Operations (Purple).
            </p>
          </div>

          {/* Query Input */}
          <div className="space-y-3">
            <label htmlFor="query-input" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
              Enter your prompt
            </label>
            <Textarea
              id="query-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query here (e.g., Show the shortest communication path between the Financial Network and the Operations Network)."
              className="min-h-[120px] font-mono text-sm bg-secondary border-border focus:border-primary focus:ring-primary resize-none"
            />
            <Button
              onClick={handleSubmit}
              disabled={!query.trim() || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Run Analysis
            </Button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <Card id="loading-indicator" className="p-6 bg-secondary/30 border-warning/50">
            <h2 className="text-lg font-bold text-warning mb-4 flex items-center gap-2">
              <span className="animate-pulse">⚡</span>
              Executing Deep Learning Analysis...
            </h2>
            <div className="space-y-3">
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-warning via-primary to-warning bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] rounded-full"></div>
              </div>
              <p className="text-sm text-foreground/70 font-mono">
                Current Module: Shortest Path Determination & Entity Resolution (2/5)
              </p>
            </div>
          </Card>
        )}

        {/* Results Section */}
        {showResults && (
          <div id="results-section" className="space-y-6 animate-in fade-in duration-500">
            {/* Success Indicator */}
            <div className="flex items-center gap-2 text-success font-semibold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Query executed successfully.
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-secondary rounded">
                <p className="text-foreground/60 text-xs uppercase">Total Connections</p>
                <p className="text-2xl font-bold text-foreground">{burnerConnections}</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-foreground/60 text-xs uppercase">Path Confidence</p>
                <p className="text-2xl font-bold text-success">0.98</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-foreground/60 text-xs uppercase">Execution Time</p>
                <p className="text-2xl font-bold text-foreground">3.12s</p>
              </div>
            </div>

            {/* Critical Insight */}
            <div className="p-5 bg-primary/5 border-l-4 border-primary rounded">
              <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                <span>🔍</span>
                Critical Path Revelation
              </h3>
              <p className="text-foreground leading-relaxed">
                <strong>Key Finding:</strong> The shortest path between the Financial Network and Operations Network is the <span className="font-mono text-primary font-semibold">{burnerNode?.label || 'Burner Phone'} ({burnerNode?.metadata?.imei || '+91-888...'})</span>. This node is the bridge of the conspiracy with {burnerConnections} direct connections.
              </p>
            </div>

            {/* Visualization Placeholder */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Simulated Conspiracy Flow (Orange ↔ Purple)
              </h3>
              <div className="h-64 bg-secondary rounded-lg border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="flex items-center justify-center gap-8">
                      <div className="space-y-2">
                        <div className="w-20 h-20 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                          <span className="text-xs font-mono">Financial</span>
                        </div>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="h-0.5 w-24 bg-primary relative">
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-mono text-primary">Bridge</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                          <span className="text-xs font-mono">Burner</span>
                        </div>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="h-0.5 w-24 bg-primary"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-20 h-20 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                          <span className="text-xs font-mono">Operations</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/50 font-mono">Graph Visualization Engine: NetworkX v3.2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Burner Phone Transaction & Contact Log ({totalNodes} nodes, {totalEdges} edges)
              </h3>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Timestamp (UTC)</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Protocol/Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Connected Alias/Wallet ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Confidence Score</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Content/Event Snippet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                        <td className="px-4 py-3 font-mono text-foreground">{row.id}</td>
                        <td className="px-4 py-3 font-mono text-foreground/80">{row.timestamp}</td>
                        <td className="px-4 py-3 text-foreground/80">{row.protocol}</td>
                        <td className="px-4 py-3 font-mono text-primary">{row.alias}</td>
                        <td className={`px-4 py-3 font-bold ${row.confidence >= 0.9 ? "text-success" : row.confidence < 0.7 ? "text-warning" : "text-foreground"}`}>
                          {row.confidence.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-foreground/80 italic">{row.snippet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Card>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Console;
