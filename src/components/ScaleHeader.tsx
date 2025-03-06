import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import DatePicker from "./DatePicker";
import MonthPicker from "./MonthPicker";
import { Label } from "./ui/label";

interface ScaleHeaderProps {
  scaleName: string;
  onScaleNameChange: (name: string) => void;
  onSave: () => void;
  className?: string;
}

const ScaleHeader: React.FC<ScaleHeaderProps> = ({
  scaleName,
  onScaleNameChange,
  onSave,
  className,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-end">
        <Button onClick={onSave} className="gap-1.5">
          <Save className="h-4 w-4" />
          <span>Gerar Escala</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="scale-name" className="text-sm font-medium">
            Nome da Escala
          </label>
          <Input
            id="scale-name"
            value={scaleName}
            onChange={(e) => onScaleNameChange(e.target.value)}
            placeholder="Ex: Escala de Julho/2023"
            className="max-w-md"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <Label htmlFor="month">Escolha o mês da escala</Label>
            <MonthPicker name="month" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleHeader;
