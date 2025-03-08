
import React, { useState } from 'react';
import { mockCooperators } from '@/hooks/useScheduleState';
import ExceptionModal from '@/components/ExceptionModal';
import ScheduleAssignmentModal from '@/components/ScheduleAssignmentModal';
import ScaleLayout from '@/components/ScaleLayout';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleFormSchema, ScheduleFormValues } from '@/schemas/scheduleFormSchema';
import { toast } from 'sonner';
import { ExceptionData } from '@/components/ExceptionModal';
import { AssignmentData } from '@/components/ScheduleAssignmentModal';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  // Main form using React Hook Form
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      scaleName: "Nova Escala",
      startDate: undefined,
      endDate: undefined,
      selectedCooperatorIds: mockCooperators.slice(0, 8).map(c => c.id), // First 8 cooperators pre-selected
    },
  });

  // Exceptions state
  const [exceptions, setExceptions] = useState<Array<ExceptionData & { id: string }>>([]);
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [selectedCooperatorForException, setSelectedCooperatorForException] = useState<string | undefined>(undefined);
  
  // Assignments state
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [selectedCooperatorForAssignment, setSelectedCooperatorForAssignment] = useState<string | undefined>(undefined);

  // Get form values for calculating derived state
  const { selectedCooperatorIds } = form.watch();
  
  // Prepare cooperators with flags for UI
  const cooperatorsWithFlags = mockCooperators.map(cooperator => ({
    ...cooperator,
    hasExceptions: exceptions.some(exception => exception.cooperatorId === cooperator.id),
    hasAssignments: assignments.some(assignment => assignment.cooperatorId === cooperator.id),
  }));

  // Toggle cooperator selection
  const handleToggleCooperator = (id: string) => {
    const currentSelected = form.getValues().selectedCooperatorIds;
    if (currentSelected.includes(id)) {
      form.setValue('selectedCooperatorIds', currentSelected.filter(cooperatorId => cooperatorId !== id));
    } else {
      form.setValue('selectedCooperatorIds', [...currentSelected, id]);
    }
  };

  // Exception handlers
  const handleAddExceptionForCooperator = (cooperatorId: string) => {
    setSelectedCooperatorForException(cooperatorId);
    setIsExceptionModalOpen(true);
  };
  
  const handleAddException = () => {
    setSelectedCooperatorForException(undefined);
    setIsExceptionModalOpen(true);
  };
  
  const handleSaveException = (exceptionData: ExceptionData) => {
    const newException = {
      ...exceptionData,
      id: uuidv4(),
    };
    
    setExceptions(prev => [...prev, newException]);
    
    const cooperator = mockCooperators.find(c => c.id === exceptionData.cooperatorId);
    toast.success("Exceção adicionada", {
      description: `Exceção adicionada para ${cooperator?.name || "cooperador"}.`,
    });
  };
  
  const handleRemoveException = (id: string) => {
    setExceptions(prev => prev.filter(exception => exception.id !== id));
    toast.success("Exceção removida");
  };

  // Assignment handlers
  const handleAddAssignmentForCooperator = (cooperatorId: string) => {
    setSelectedCooperatorForAssignment(cooperatorId);
    setIsAssignmentModalOpen(true);
  };

  const handleSaveAssignment = (assignmentData: AssignmentData) => {
    setAssignments(prev => [...prev, assignmentData]);
    
    const cooperator = mockCooperators.find(c => c.id === assignmentData.cooperatorId);
    toast.success("Agendamento adicionado", {
      description: `${cooperator?.name || "Cooperador"} agendado para ${assignmentData.date.toLocaleDateString()}.`,
    });
  };

  const handleRemoveAssignment = (id: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
    toast.success("Agendamento removido");
  };
  
  // Handle save form
  const handleSaveScale = () => {
    form.handleSubmit((values) => {
      if (!values.startDate || !values.endDate) {
        toast.error("Erro ao salvar", {
          description: "Selecione as datas inicial e final da escala.",
        });
        return;
      }
      
      if (values.selectedCooperatorIds.length === 0) {
        toast.error("Erro ao salvar", {
          description: "Selecione pelo menos um cooperador para a escala.",
        });
        return;
      }
      
      // Here you would implement the actual saving logic
      toast.success("Escala salva com sucesso!", {
        description: `${values.selectedCooperatorIds.length} cooperadores incluídos na escala.`,
      });
    })();
  };

  return (
    <FormProvider {...form}>
      <ScaleLayout
        onSave={handleSaveScale}
        
        // Cooperators
        cooperatorsWithFlags={cooperatorsWithFlags}
        selectedCooperatorIds={selectedCooperatorIds}
        onToggleCooperator={handleToggleCooperator}
        onAddExceptionForCooperator={handleAddExceptionForCooperator}
        onAddAssignmentForCooperator={handleAddAssignmentForCooperator}
        
        // Exceptions
        exceptions={exceptions}
        onAddException={handleAddException}
        onRemoveException={handleRemoveException}
        
        // Assignments
        assignments={assignments}
        onAddAssignment={() => setIsAssignmentModalOpen(true)}
        onRemoveAssignment={handleRemoveAssignment}
      />
      
      <ExceptionModal
        isOpen={isExceptionModalOpen}
        onClose={() => setIsExceptionModalOpen(false)}
        onSave={handleSaveException}
        cooperators={mockCooperators}
        selectedCooperatorId={selectedCooperatorForException}
      />
      
      <ScheduleAssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        onSave={handleSaveAssignment}
        cooperators={mockCooperators}
        selectedCooperatorId={selectedCooperatorForAssignment}
      />
    </FormProvider>
  );
};

export default Index;
