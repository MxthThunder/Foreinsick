import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatabaseFiltersProps {
  timeframe: string;
  crimeTypes: string[];
  caseStatus: string;
  onTimeframeChange: (value: string) => void;
  onCrimeTypesChange: (value: string[]) => void;
  onCaseStatusChange: (value: string) => void;
}

export const DatabaseFilters = ({
  timeframe,
  caseStatus,
  onTimeframeChange,
  onCaseStatusChange,
}: DatabaseFiltersProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Compare Against Database Filters
      </h3>
      
      <div className="space-y-2">
        <Label htmlFor="timeframe">Timeframe</Label>
        <Select value={timeframe} onValueChange={onTimeframeChange}>
          <SelectTrigger id="timeframe" className="bg-background">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="1year">Past 1 Year</SelectItem>
            <SelectItem value="3years">Past 3 Years</SelectItem>
            <SelectItem value="5years">Past 5 Years</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="caseStatus">Case Status</Label>
        <Select value={caseStatus} onValueChange={onCaseStatusChange}>
          <SelectTrigger id="caseStatus" className="bg-background">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Cases</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
