import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModeSelectorProps {
  mode: "newCase" | "specific";
  onModeChange: (mode: "newCase" | "specific") => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <Tabs
      value={mode}
      onValueChange={(value) => onModeChange(value as "newCase" | "specific")}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 bg-secondary">
        <TabsTrigger value="newCase" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          New Case vs. Database
        </TabsTrigger>
        <TabsTrigger value="specific" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          Specific Case Comparison
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
