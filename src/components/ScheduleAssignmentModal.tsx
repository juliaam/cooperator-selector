
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "./DatePicker";
import { Cooperator } from "./CooperatorCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ScheduleAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assignment: AssignmentData) => void;
  cooperators: Cooperator[];
  selectedCooperatorId?: string;
}

export interface AssignmentData {
  cooperatorId: string;
  date: Date;
  id: string;
}

// Schema for assignment form
const assignmentSchema = z.object({
  cooperatorId: z.string().min(1, "Selecione um cooperador"),
  date: z.date({
    required_error: "Selecione uma data",
  }),
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

const ScheduleAssignmentModal: React.FC<ScheduleAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cooperators,
  selectedCooperatorId,
}) => {
  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      cooperatorId: selectedCooperatorId || "",
      date: undefined,
    },
  });

  const { watch, setValue, handleSubmit, reset, formState: { isValid } } = form;
  const cooperatorId = watch("cooperatorId");
  const assignmentDate = watch("date");

  const handleSaveForm = handleSubmit((data) => {
    onSave({
      ...data,
      id: crypto.randomUUID(),
    });
    handleClose();
  });

  const handleClose = () => {
    reset({
      cooperatorId: selectedCooperatorId || "",
      date: undefined,
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
          <DialogTitle className="text-xl font-semibold">Agendar Cooperador</DialogTitle>
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
            <Label>Data do Agendamento</Label>
            <DatePicker 
              date={assignmentDate} 
              onSelect={(date) => setValue("date", date)} 
              label="Selecione a data"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveForm} disabled={!isValid}>
            Agendar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleAssignmentModal;
