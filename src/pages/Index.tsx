import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeSelector } from "@/components/ModeSelector";
import { FileUploadZone } from "@/components/FileUploadZone";
import { DatabaseFilters } from "@/components/DatabaseFilters";
import { CaseSelector } from "@/components/CaseSelector";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { defaultOfficerId, getOfficerById } from "@/data/officers";
import { useNavigate } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";

const Index = () => {
  const navigate = useNavigate();
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
  const [activeOfficerId] = useState(defaultOfficerId);

  const officer = useMemo(() => getOfficerById(activeOfficerId), [activeOfficerId]);

  const lastLoginLabel = useMemo(() => {
    if (!officer?.lastLogin) return "Last login unavailable";
    try {
      return formatDistanceToNow(new Date(officer.lastLogin), { addSuffix: true });
    } catch (error) {
      return "Last login unavailable";
    }
  }, [officer?.lastLogin]);

  const lastSyncLabel = useMemo(() => {
    if (!officer?.lastSync) return null;
    try {
      return format(new Date(officer.lastSync), "PPpp");
    } catch (error) {
      return null;
    }
  }, [officer?.lastSync]);

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
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/console")}
                className="gap-2"
              >
                <Terminal className="h-4 w-4" />
                Query Analysis
              </Button>
              <ThemeToggle />
              {officer ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-3 rounded-md border border-input bg-background px-3 py-2 text-left shadow-sm transition hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">Officer ID: {officer.id}</p>
                        <p className="text-xs text-muted-foreground">Last login: {lastLoginLabel}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold">{officer.initials}</span>
                      </div>
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent align="end" className="w-80">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{officer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {officer.rank} · {officer.division}
                          </p>
                        </div>
                        <Badge variant="outline">{officer.clearance}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                        <div>
                          <p className="font-medium text-foreground">Active cases</p>
                          <p>{officer.activeCases}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Duty status</p>
                          <p>{officer.onDuty ? "On duty" : "Off duty"}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-medium text-foreground">Linked cases</p>
                          <p>{officer.linkedCases.join(", ")}</p>
                        </div>
                      </div>
                      <div className="rounded-md bg-secondary/60 p-3 text-xs text-muted-foreground">
                        <p className="font-medium text-foreground">Contact</p>
                        <p>Email: {officer.email}</p>
                        <p>Phone: {officer.phone}</p>
                        {lastSyncLabel && (
                          <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground/70">
                            Last sync: {lastSyncLabel}
                          </p>
                        )}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <div className="flex items-center gap-3 rounded-md border border-dashed border-muted px-3 py-2">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">Officer ID: {activeOfficerId}</p>
                    <p className="text-xs text-muted-foreground">Officer details unavailable</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-semibold">--</span>
                  </div>
                </div>
              )}
            </div>
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
