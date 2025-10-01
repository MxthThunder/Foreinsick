import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeSelector } from "@/components/ModeSelector";
import { FileUploadZone } from "@/components/FileUploadZone";
import { DatabaseFilters } from "@/components/DatabaseFilters";
import { CaseSelector } from "@/components/CaseSelector";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const Index = () => {
  const [mode, setMode] = useState<"newCase" | "specific">("newCase");
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [timeframe, setTimeframe] = useState("1year");
  const [crimeTypes, setCrimeTypes] = useState<string[]>([]);
  const [caseStatus, setCaseStatus] = useState("all");
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [linkageCriteria, setLinkageCriteria] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
    }, 2500);
  };

  const canRunAnalysis = 
    mode === "newCase" 
      ? selectedFile !== null 
      : selectedCases.length >= 2;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Cross-Case Linkage Analysis
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                AI-powered forensic data correlation system
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Control Panel */}
        <aside
          className={cn(
            "bg-card border-r transition-all duration-300 overflow-y-auto",
            isControlPanelOpen ? "w-96" : "w-0"
          )}
        >
          <div className="p-6 space-y-6">
            <ModeSelector mode={mode} onModeChange={setMode} />

            {mode === "newCase" ? (
              <>
                <FileUploadZone
                  onFileSelect={setSelectedFile}
                  selectedFile={selectedFile}
                />
                <DatabaseFilters
                  timeframe={timeframe}
                  crimeTypes={crimeTypes}
                  caseStatus={caseStatus}
                  onTimeframeChange={setTimeframe}
                  onCrimeTypesChange={setCrimeTypes}
                  onCaseStatusChange={setCaseStatus}
                />
              </>
            ) : (
              <CaseSelector
                selectedCases={selectedCases}
                onCasesChange={setSelectedCases}
                linkageCriteria={linkageCriteria}
                onCriteriaChange={setLinkageCriteria}
              />
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={handleRunAnalysis}
              disabled={!canRunAnalysis || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Run Linkage Analysis"}
            </Button>
          </div>
        </aside>

        {/* Toggle Button */}
        <button
          onClick={() => setIsControlPanelOpen(!isControlPanelOpen)}
          className="w-6 bg-card border-r hover:bg-muted/50 transition-colors flex items-center justify-center"
          aria-label="Toggle control panel"
        >
          {isControlPanelOpen ? (
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {/* Right Results Panel */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <ResultsPanel
              mode={mode}
              isAnalyzing={isAnalyzing}
              hasResults={hasResults}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
