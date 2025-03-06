
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "./DatePicker";
import { Cooperator } from "./CooperatorCard";
import { format } from "date-fns";

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

const ScheduleAssignmentModal: React.FC<ScheduleAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cooperators,
  selectedCooperatorId,
}) => {
  const [cooperatorId, setCooperatorId] = useState(selectedCooperatorId || "");
  const [assignmentDate, setAssignmentDate] = useState<Date | undefined>(undefined);

  const handleSave = () => {
    if (!cooperatorId || !assignmentDate) return;
    
    onSave({
      cooperatorId,
      date: assignmentDate,
      id: crypto.randomUUID(),
    });
    
    handleClose();
  };

  const handleClose = () => {
    setCooperatorId(selectedCooperatorId || "");
    setAssignmentDate(undefined);
    onClose();
  };

  const isValid = cooperatorId && assignmentDate;

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
            <Label>Data do Agendamento</Label>
            <DatePicker 
              date={assignmentDate} 
              onSelect={setAssignmentDate} 
              label="Selecione a data"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            Agendar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleAssignmentModal;
