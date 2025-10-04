import { FileSearch, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import NetworkGraph from "@/components/graph/NetworkGraph";
import { shadowNetData } from "@/data/shadownet";
import ClusterLegend from "@/components/graph/ClusterLegend";
import TemporalSlider from "@/components/graph/TemporalSlider";
import PathAnalysis from "@/components/graph/PathAnalysis";
import { GraphData, NodeType } from "@/types/graph";

interface ResultsPanelProps {
  mode: "newCase" | "specific";
  isAnalyzing: boolean;
  hasResults: boolean;
}

export const ResultsPanel = ({ mode, isAnalyzing, hasResults }: ResultsPanelProps) => {
  const [selectedEvidence, setSelectedEvidence] = useState<number | null>(null);
  const [activeCluster, setActiveCluster] = useState<NodeType | null>(null);
  const [timeFilter, setTimeFilter] = useState<Date | null>(null);
  const [pathHighlight, setPathHighlight] = useState<{ source: string; target: string } | null>(null);

  const graphData: GraphData = shadowNetData;

  const dates = useMemo(() => {
    const nodeDates = graphData.nodes.map(n => n.timestamp).filter(Boolean) as Date[];
    const edgeDates = graphData.edges.map(e => e.timestamp).filter(Boolean) as Date[];
    const all = [...nodeDates, ...edgeDates];
    if (all.length === 0) return null;
    return {
      min: new Date(Math.min(...all.map(d => d.getTime()))),
      max: new Date(Math.max(...all.map(d => d.getTime())))
    };
  }, [graphData]);

  const clusterCounts = useMemo(() => {
    const counts = {
      person: 0,
      phone: 0,
      financial: 0,
      location: 0,
      keyword: 0,
      organization: 0,
    } as Record<NodeType, number>;
    for (const n of graphData.nodes) counts[n.type]++;
    return counts;
  }, [graphData]);

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">Analyzing Cases...</p>
          <p className="text-sm text-muted-foreground mt-1">
            Running AI linkage analysis across database
          </p>
        </div>
        <Progress value={65} className="w-64" />
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <FileSearch className="h-24 w-24 text-muted-foreground/50" />
        <div className="text-center max-w-md">
          <p className="text-lg font-medium text-foreground">Ready to Analyze</p>
          <p className="text-sm text-muted-foreground mt-2">
            {mode === "newCase"
              ? "Upload a UFDR file and configure filters, then click 'Run Linkage Analysis' to discover connections."
              : "Select cases for comparison and click 'Run Linkage Analysis' to view detailed connections."}
          </p>
        </div>
      </div>
    );
  }

  // Enhanced layout without overlap: controls live in a grid card above the graph
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {mode === "newCase" ? "Top Matching Cases" : "Connection Analysis"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Found {mode === "newCase" ? "8 matching cases" : "27 connection points"}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </div>

      {mode === "newCase" ? (
        <div className="space-y-3">
          {[
            {
              id: "2023-015",
              title: "Cybercrime - Data Breach",
              score: 87,
              type: "Shared Contacts",
            },
            {
              id: "2023-092",
              title: "Narcotics Operation",
              score: 76,
              type: "Shared Media",
            },
            {
              id: "2024-001",
              title: "Theft Investigation",
              score: 68,
              type: "Location Overlap",
            },
            {
              id: "2022-045",
              title: "Murder Investigation",
              score: 54,
              type: "Shared Contacts",
            },
          ].map((match) => (
            <div
              key={match.id}
              className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">{match.id}</span>
                    <Badge
                      variant={match.score >= 75 ? "success" : match.score >= 60 ? "warning" : "secondary"}
                    >
                      {match.score}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mt-1">{match.title}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Key Link: {match.type}
                  </p>
                </div>
                <Progress value={match.score} className="w-24 h-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 border-2 rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Connection Strength</h3>
              <Badge variant="success" className="text-base px-3 py-1">
                High Confidence Match
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <ClusterLegend
                  activeCluster={activeCluster}
                  onClusterClick={setActiveCluster}
                  clusterCounts={clusterCounts}
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                {dates && (
                  <TemporalSlider
                    minDate={dates.min}
                    maxDate={dates.max}
                    onDateChange={(d) => setTimeFilter(d)}
                    activeConnections={graphData.edges.filter(e => !timeFilter || !e.timestamp || e.timestamp <= (timeFilter ?? dates.max)).length}
                  />
                )}
                <PathAnalysis
                  data={graphData}
                  onPathRequest={(source, target) => setPathHighlight({ source, target })}
                  onClearPath={() => setPathHighlight(null)}
                />
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Network Visualization</h3>
            <NetworkGraph
              data={graphData}
              timeFilter={timeFilter ?? undefined}
              activeCluster={activeCluster ?? undefined}
              pathHighlight={pathHighlight ?? undefined}
            />
          </div>

          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="p-4 bg-muted/50 border-b">
              <h3 className="text-lg font-semibold text-foreground">Detailed Linkage Evidence</h3>
            </div>
            <div className="divide-y">
              {[
                {
                  type: "Shared Photo",
                  source: "2024-001",
                  target: "2023-015",
                  value: "IMG_4521.jpg",
                },
                {
                  type: "Common Contact",
                  source: "2024-001",
                  target: "2023-015",
                  value: "+1-555-0123",
                },
                {
                  type: "Location Overlap",
                  source: "2024-001",
                  target: "2023-015",
                  value: "Downtown Plaza",
                },
              ].map((evidence, i) => (
                <div key={i} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">{evidence.type}</Badge>
                      <p className="text-sm text-foreground font-medium">{evidence.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {evidence.source} ↔ {evidence.target}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedEvidence(i)}>
                      View Context
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Dialog open={selectedEvidence !== null} onOpenChange={() => setSelectedEvidence(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Evidence Context</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"
                alt="Evidence context 1"
                className="w-full h-64 object-cover rounded-lg border"
              />
              <img
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800"
                alt="Evidence context 2"
                className="w-full h-64 object-cover rounded-lg border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                alt="Evidence context 3"
                className="w-full h-64 object-cover rounded-lg border"
              />
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800"
                alt="Evidence context 4"
                className="w-full h-64 object-cover rounded-lg border"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
