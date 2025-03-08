import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "./DatePicker";
import { Cooperator } from "./CooperatorCard";
import { ExceptionData } from "@/shared/types/Exception";

interface ExceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
}

const ExceptionModal: React.FC<ExceptionModalProps> = ({
  isOpen,
  onClose,
  cooperators,
  selectedCooperatorId,
}) => {
  const [exceptionType, setExceptionType] = useState<"one-time" | "recurring">(
    "one-time"
  );
  const [cooperatorId, setCooperatorId] = useState(selectedCooperatorId || "");
  const [exceptionDate, setExceptionDate] = useState<Date | undefined>(
    undefined
  );
  const [weekday, setWeekday] = useState<string>("");

  const handleSave = () => {
    if (!cooperatorId) return;

    const exceptionData: ExceptionData = {
      type: exceptionType,
      cooperatorId,
      ...(exceptionType === "one-time" ? { date: exceptionDate } : { weekday }),
    };

    handleClose();
  };

  const handleClose = () => {
    setExceptionType("one-time");
    setCooperatorId(selectedCooperatorId || "");
    setExceptionDate(undefined);
    setWeekday("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="animate-slide-up sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Adicionar Exceção
          </DialogTitle>
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
              onValueChange={(v) =>
                setExceptionType(v as "one-time" | "recurring")
              }
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-time" id="one-time" />
                <Label
                  htmlFor="one-time"
                  className="cursor-pointer font-normal"
                >
                  Data específica
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label>Data da Exceção</Label>
            <DatePicker
              date={exceptionDate}
              onSelect={setExceptionDate}
              label="Selecione a data"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Exceção</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExceptionModal;
