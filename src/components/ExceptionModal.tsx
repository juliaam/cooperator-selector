
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "./DatePicker";
import { Cooperator } from "./CooperatorCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

// Schema for exception form
const exceptionSchema = z.object({
  type: z.enum(["one-time", "recurring"]),
  cooperatorId: z.string().min(1, "Selecione um cooperador"),
  date: z.date().optional(),
  weekday: z.string().optional(),
}).refine(data => {
  if (data.type === "one-time" && !data.date) return false;
  if (data.type === "recurring" && !data.weekday) return false;
  return true;
}, {
  message: "Preencha os dados da exceção corretamente",
  path: ["type"],
});

type ExceptionFormValues = z.infer<typeof exceptionSchema>;

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
  const form = useForm<ExceptionFormValues>({
    resolver: zodResolver(exceptionSchema),
    defaultValues: {
      type: "one-time",
      cooperatorId: selectedCooperatorId || "",
      date: undefined,
      weekday: "",
    },
  });

  const { watch, setValue, handleSubmit, reset, formState: { isValid } } = form;
  const exceptionType = watch("type");
  const cooperatorId = watch("cooperatorId");
  const exceptionDate = watch("date");
  const weekday = watch("weekday");

  const handleSaveForm = handleSubmit((data) => {
    // Make sure all required fields are present based on the type
    const exceptionData: ExceptionData = {
      type: data.type,
      cooperatorId: data.cooperatorId,
      // Only include date or weekday properties as needed
      ...(data.type === "one-time" && data.date ? { date: data.date } : {}),
      ...(data.type === "recurring" && data.weekday ? { weekday: data.weekday } : {}),
    };
    
    onSave(exceptionData);
    handleClose();
  });

  const handleClose = () => {
    reset({
      type: "one-time",
      cooperatorId: selectedCooperatorId || "",
      date: undefined,
      weekday: "",
    });
    onClose();
  };

  React.useEffect(() => {
    if (selectedCooperatorId) {
      setValue("cooperatorId", selectedCooperatorId);
    }
  }, [selectedCooperatorId, setValue]);

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
              onValueChange={(value) => setValue("cooperatorId", value)}
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
              onValueChange={(v) => setValue("type", v as "one-time" | "recurring")}
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
                onSelect={(date) => setValue("date", date)} 
                label="Selecione a data"
              />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="weekday">Dia da Semana</Label>
              <Select 
                value={weekday || ""} 
                onValueChange={(value) => setValue("weekday", value)}
              >
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
          <Button onClick={handleSaveForm} disabled={!isValid}>
            Salvar Exceção
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExceptionModal;
