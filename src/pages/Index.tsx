
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { format } from 'date-fns';
import CooperatorList from '@/components/CooperatorList';
import ScaleHeader from '@/components/ScaleHeader';
import ExceptionList from '@/components/ExceptionList';
import ExceptionModal, { ExceptionData } from '@/components/ExceptionModal';
import ScheduleAssignmentList from '@/components/ScheduleAssignmentList';
import ScheduleAssignmentModal, { AssignmentData } from '@/components/ScheduleAssignmentModal';
import { Cooperator } from '@/components/CooperatorCard';

// Mock data for initial cooperators
const mockCooperators: Cooperator[] = [
  { id: "1", name: "Ana Silva", role: "Equipe de Louvor", avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Bruno Costa", role: "Ministério de Música", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "3", name: "Carla Pereira", role: "Equipe de Louvor", avatarUrl: "https://i.pravatar.cc/150?img=3" },
  { id: "4", name: "Daniel Oliveira", role: "Ministério de Música", avatarUrl: "https://i.pravatar.cc/150?img=4" },
  { id: "5", name: "Eduardo Santos", role: "Equipe Técnica", avatarUrl: "https://i.pravatar.cc/150?img=5" },
  { id: "6", name: "Fernanda Lima", role: "Vocal", avatarUrl: "https://i.pravatar.cc/150?img=6" },
  { id: "7", name: "Gabriel Martins", role: "Bateria", avatarUrl: "https://i.pravatar.cc/150?img=7" },
  { id: "8", name: "Helena Castro", role: "Teclado", avatarUrl: "https://i.pravatar.cc/150?img=8" },
  { id: "9", name: "Igor Alves", role: "Guitarra", avatarUrl: "https://i.pravatar.cc/150?img=9" },
  { id: "10", name: "Juliana Fernandes", role: "Vocal", avatarUrl: "https://i.pravatar.cc/150?img=10" },
  { id: "11", name: "Lucas Ribeiro", role: "Baixo", avatarUrl: "https://i.pravatar.cc/150?img=11" },
  { id: "12", name: "Mariana Rocha", role: "Vocal", avatarUrl: "https://i.pravatar.cc/150?img=12" },
];

const Index = () => {
  // Scale details
  const [scaleName, setScaleName] = useState("Nova Escala");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Cooperator selection
  const [selectedCooperatorIds, setSelectedCooperatorIds] = useState<string[]>(
    mockCooperators.slice(0, 8).map(c => c.id) // First 8 cooperators pre-selected
  );
  
  // Exceptions
  const [exceptions, setExceptions] = useState<Array<ExceptionData & { id: string }>>([]);
  
  // Exception modal
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [selectedCooperatorForException, setSelectedCooperatorForException] = useState<string | undefined>(undefined);

  // Assignments
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  
  // Assignment modal
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [selectedCooperatorForAssignment, setSelectedCooperatorForAssignment] = useState<string | undefined>(undefined);
  
  // Update cooperators with exception and assignment flags
  const cooperatorsWithFlags = mockCooperators.map(cooperator => ({
    ...cooperator,
    hasExceptions: exceptions.some(exception => exception.cooperatorId === cooperator.id),
    hasAssignments: assignments.some(assignment => assignment.cooperatorId === cooperator.id),
  }));
  
  // Toggle cooperator selection
  const handleToggleCooperator = (id: string) => {
    setSelectedCooperatorIds(prev => 
      prev.includes(id) 
        ? prev.filter(cooperatorId => cooperatorId !== id)
        : [...prev, id]
    );
  };
  
  // Open exception modal for a specific cooperator
  const handleAddExceptionForCooperator = (cooperatorId: string) => {
    setSelectedCooperatorForException(cooperatorId);
    setIsExceptionModalOpen(true);
  };
  
  // Open exception modal (general)
  const handleAddException = () => {
    setSelectedCooperatorForException(undefined);
    setIsExceptionModalOpen(true);
  };
  
  // Save exception
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
  
  // Remove exception
  const handleRemoveException = (id: string) => {
    setExceptions(prev => prev.filter(exception => exception.id !== id));
    toast.success("Exceção removida");
  };

  // Add assignment for a specific cooperator
  const handleAddAssignmentForCooperator = (cooperatorId: string) => {
    setSelectedCooperatorForAssignment(cooperatorId);
    setIsAssignmentModalOpen(true);
  };

  // Save assignment
  const handleSaveAssignment = (assignmentData: AssignmentData) => {
    setAssignments(prev => [...prev, assignmentData]);
    
    const cooperator = mockCooperators.find(c => c.id === assignmentData.cooperatorId);
    toast.success("Agendamento adicionado", {
      description: `${cooperator?.name || "Cooperador"} agendado para ${format(assignmentData.date, 'dd/MM/yyyy')}.`,
    });
  };

  // Remove assignment
  const handleRemoveAssignment = (id: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
    toast.success("Agendamento removido");
  };
  
  // Save scale
  const handleSaveScale = () => {
    if (!startDate || !endDate) {
      toast.error("Erro ao salvar", {
        description: "Selecione as datas inicial e final da escala.",
      });
      return;
    }
    
    if (selectedCooperatorIds.length === 0) {
      toast.error("Erro ao salvar", {
        description: "Selecione pelo menos um cooperador para a escala.",
      });
      return;
    }
    
    // Here you would implement the actual saving logic
    toast.success("Escala salva com sucesso!", {
      description: `${selectedCooperatorIds.length} cooperadores incluídos na escala.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto py-6 px-4 flex flex-col h-full max-h-screen">
        <ScaleHeader
          scaleName={scaleName}
          onScaleNameChange={setScaleName}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onSave={handleSaveScale}
          className="mb-4"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden">
          <div className="lg:col-span-2 overflow-hidden">
            <div className="bg-card rounded-lg shadow-sm border p-4 h-full animate-fade-in flex flex-col">
              <h2 className="text-xl font-semibold mb-2">Cooperadores</h2>
              <CooperatorList
                allCooperators={cooperatorsWithFlags}
                selectedCooperatorIds={selectedCooperatorIds}
                onToggle={handleToggleCooperator}
                onAddException={handleAddExceptionForCooperator}
                onAddAssignment={handleAddAssignmentForCooperator}
                className="flex-1 overflow-hidden"
              />
            </div>
          </div>
          
          <div className="grid grid-rows-2 gap-4 h-full animate-fade-in animation-delay-100">
            <ExceptionList
              exceptions={exceptions}
              cooperators={mockCooperators}
              onAddException={handleAddException}
              onRemoveException={handleRemoveException}
              className="h-full overflow-hidden"
            />
            
            <ScheduleAssignmentList
              assignments={assignments}
              cooperators={mockCooperators}
              onAddAssignment={() => setIsAssignmentModalOpen(true)}
              onRemoveAssignment={handleRemoveAssignment}
              className="h-full overflow-hidden"
            />
          </div>
        </div>
      </div>
      
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
    </div>
  );
};

export default Index;
