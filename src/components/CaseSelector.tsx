import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CaseSelectorProps {
  selectedCases: string[];
  onCasesChange: (cases: string[]) => void;
  linkageCriteria: string[];
  onCriteriaChange: (criteria: string[]) => void;
}

// Mock data for demonstration
const availableCases = [
  { id: "2024-001", title: "Theft Investigation - Downtown" },
  { id: "2024-007", title: "Fraud Case - Financial District" },
  { id: "2023-015", title: "Cybercrime - Data Breach" },
  { id: "2023-092", title: "Narcotics Operation - Harbor" },
  { id: "2022-045", title: "Murder Investigation - Residential" },
];

const criteriaOptions = [
  { id: "contacts", label: "Shared Contacts" },
  { id: "media", label: "Shared Media" },
  { id: "location", label: "Location Overlap" },
  { id: "textual", label: "Textual Similarity" },
];

export const CaseSelector = ({
  selectedCases,
  onCasesChange,
  linkageCriteria,
  onCriteriaChange,
}: CaseSelectorProps) => {
  const [selectSlots, setSelectSlots] = useState<number[]>([0, 1]);

  const handleAddCase = () => {
    setSelectSlots([...selectSlots, selectSlots.length]);
  };

  const handleRemoveCase = (index: number) => {
    const newCases = [...selectedCases];
    newCases.splice(index, 1);
    onCasesChange(newCases);
    
    const newSlots = [...selectSlots];
    newSlots.splice(index, 1);
    setSelectSlots(newSlots);
  };

  const handleCaseSelect = (value: string, index: number) => {
    const newCases = [...selectedCases];
    newCases[index] = value;
    onCasesChange(newCases);
  };

  const handleCriteriaToggle = (criteriaId: string) => {
    if (linkageCriteria.includes(criteriaId)) {
      onCriteriaChange(linkageCriteria.filter(c => c !== criteriaId));
    } else {
      onCriteriaChange([...linkageCriteria, criteriaId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">
          Select Cases for Direct Comparison
        </h3>
        
        {selectSlots.map((slot, index) => (
          <div key={slot} className="flex items-center gap-2">
            <Select
              value={selectedCases[index] || ""}
              onValueChange={(value) => handleCaseSelect(value, index)}
            >
              <SelectTrigger className="bg-background flex-1">
                <SelectValue placeholder={`Select Case ${index + 1}...`} />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {availableCases.map((caseItem) => (
                  <SelectItem key={caseItem.id} value={caseItem.id}>
                    {caseItem.id} - {caseItem.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectSlots.length > 2 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCase(index)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        {selectedCases.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCases.map((caseId) => {
              const caseData = availableCases.find(c => c.id === caseId);
              return caseData ? (
                <Badge key={caseId} variant="secondary">
                  {caseData.id}
                </Badge>
              ) : null;
            })}
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddCase}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Case
        </Button>
      </div>

      <div className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium text-foreground">
          Focus Comparison On
        </h3>
        
        <div className="space-y-3">
          {criteriaOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={linkageCriteria.includes(option.id)}
                onCheckedChange={() => handleCriteriaToggle(option.id)}
              />
              <Label
                htmlFor={option.id}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
