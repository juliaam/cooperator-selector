
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "./DatePicker";
import { Cooperator } from "./CooperatorCard";
import { format } from "date-fns";

interface ExceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exception: ExceptionData) => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
}

export interface ExceptionData {
  type: "one-time" | "recurring";
  cooperatorId: string;
  date?: Date;
  weekday?: string;
}

const weekdays = [
  { value: "0", label: "Domingo" },
  { value: "1", label: "Segunda-feira" },
  { value: "2", label: "Terça-feira" },
  { value: "3", label: "Quarta-feira" },
  { value: "4", label: "Quinta-feira" },
  { value: "5", label: "Sexta-feira" },
  { value: "6", label: "Sábado" },
];

const ExceptionModal: React.FC<ExceptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cooperators,
  selectedCooperatorId,
}) => {
  const [exceptionType, setExceptionType] = useState<"one-time" | "recurring">("one-time");
  const [cooperatorId, setCooperatorId] = useState(selectedCooperatorId || "");
  const [exceptionDate, setExceptionDate] = useState<Date | undefined>(undefined);
  const [weekday, setWeekday] = useState<string>("");

  const handleSave = () => {
    if (!cooperatorId) return;
    
    const exceptionData: ExceptionData = {
      type: exceptionType,
      cooperatorId,
      ...(exceptionType === "one-time" ? { date: exceptionDate } : { weekday }),
    };
    
    onSave(exceptionData);
    handleClose();
  };

  const handleClose = () => {
    setExceptionType("one-time");
    setCooperatorId(selectedCooperatorId || "");
    setExceptionDate(undefined);
    setWeekday("");
    onClose();
  };

  const isValid = cooperatorId && (
    (exceptionType === "one-time" && exceptionDate) || 
    (exceptionType === "recurring" && weekday)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] animate-slide-up">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Adicionar Exceção</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="cooperator">Cooperador</Label>
            <Select 
              value={cooperatorId} 
              onValueChange={setCooperatorId}
              disabled={!!selectedCooperatorId}
            >
              <SelectTrigger id="cooperator">
                <SelectValue placeholder="Selecione um cooperador" />
              </SelectTrigger>
              <SelectContent>
                {cooperators.map((cooperator) => (
                  <SelectItem key={cooperator.id} value={cooperator.id}>
                    {cooperator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Tipo de Exceção</Label>
            <RadioGroup 
              value={exceptionType} 
              onValueChange={(v) => setExceptionType(v as "one-time" | "recurring")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-time" id="one-time" />
                <Label htmlFor="one-time" className="font-normal cursor-pointer">Data específica</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recurring" id="recurring" />
                <Label htmlFor="recurring" className="font-normal cursor-pointer">Dia da semana recorrente</Label>
              </div>
            </RadioGroup>
          </div>

          {exceptionType === "one-time" ? (
            <div className="grid gap-2">
              <Label>Data da Exceção</Label>
              <DatePicker 
                date={exceptionDate} 
                onSelect={setExceptionDate} 
                label="Selecione a data"
              />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="weekday">Dia da Semana</Label>
              <Select value={weekday} onValueChange={setWeekday}>
                <SelectTrigger id="weekday">
                  <SelectValue placeholder="Selecione o dia da semana" />
                </SelectTrigger>
                <SelectContent>
                  {weekdays.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            Salvar Exceção
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExceptionModal;
