import { useState, useRef } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export const FileUploadZone = ({ onFileSelect, selectedFile }: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.ufdr')) {
      onFileSelect(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Upload New UFDR for Comparison
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
          isDragging
            ? "border-accent bg-accent/10"
            : "border-border hover:border-accent/50 hover:bg-muted/50",
          selectedFile && "border-success bg-success/5"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".ufdr"
          onChange={handleFileInput}
          className="hidden"
        />
        
        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-12 w-12 text-success" />
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground mt-1">File uploaded successfully</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Drop your UFDR file here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              Browse Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
