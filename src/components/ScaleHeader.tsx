import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";
import MonthPicker from "./MonthPicker";
import { Label } from "./ui/label";
import { useController, useFormContext } from "react-hook-form";

interface ScaleHeaderProps {
  scaleName: string;
  monthName: string;
  className?: string;
}

const ScaleHeader: React.FC<ScaleHeaderProps> = ({
  scaleName,
  monthName,
  className,
}) => {
  const { register, control } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({ name: monthName, control });
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-end">
        <Button type="submit" className="gap-1.5">
          <Save className="h-4 w-4" />
          <span>Gerar Escala</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={scaleName} className="text-sm font-medium">
            Nome da Escala
          </label>
          <Input
            {...register(scaleName)}
            placeholder="Ex: Escala de Julho/2023"
            className="max-w-md"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <Label htmlFor="month">Escolha o mês da escala</Label>
            <MonthPicker value={value} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleHeader;
