
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import DatePicker from "./DatePicker";

interface ScaleHeaderProps {
  scaleName: string;
  onScaleNameChange: (name: string) => void;
  startDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  endDate: Date | undefined;
  onEndDateChange: (date: Date | undefined) => void;
  onSave: () => void;
  className?: string;
}

const ScaleHeader: React.FC<ScaleHeaderProps> = ({
  scaleName,
  onScaleNameChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onSave,
  className,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </Button>
        
        <Button onClick={onSave} className="gap-1.5">
          <Save className="h-4 w-4" />
          <span>Salvar Escala</span>
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
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">
              Data Inicial
            </label>
            <DatePicker 
              date={startDate} 
              onSelect={onStartDateChange}
              label="Data inicial"
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">
              Data Final
            </label>
            <DatePicker 
              date={endDate} 
              onSelect={onEndDateChange}
              label="Data final"
            />
          </div>
        </div>
      </div>
      
      {(!startDate || !endDate) && (
        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>Selecione as datas inicial e final da escala.</p>
        </div>
      )}
    </div>
  );
};

export default ScaleHeader;
