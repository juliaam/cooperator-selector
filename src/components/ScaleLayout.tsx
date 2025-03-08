
import React from 'react';
import CooperatorList from '@/components/CooperatorList';
import ScaleHeader from '@/components/ScaleHeader';
import ExceptionList from '@/components/ExceptionList';
import ScheduleAssignmentList from '@/components/ScheduleAssignmentList';
import { mockCooperators } from '@/hooks/useScheduleState';
import { ExceptionData } from '@/components/ExceptionModal';

interface ScaleLayoutProps {
  // Save action
  onSave: () => void;
  
  // Cooperators
  cooperatorsWithFlags: typeof mockCooperators;
  selectedCooperatorIds: string[];
  onToggleCooperator: (id: string) => void;
  onAddExceptionForCooperator: (id: string) => void;
  onAddAssignmentForCooperator: (id: string) => void;
  
  // Exceptions
  exceptions: Array<ExceptionData & { id: string }>;
  onAddException: () => void;
  onRemoveException: (id: string) => void;
  
  // Assignments
  assignments: Array<{ id: string; cooperatorId: string; date: Date }>;
  onAddAssignment: () => void;
  onRemoveAssignment: (id: string) => void;
}

const ScaleLayout: React.FC<ScaleLayoutProps> = ({
  // Save action
  onSave,
  
  // Cooperators
  cooperatorsWithFlags,
  selectedCooperatorIds,
  onToggleCooperator,
  onAddExceptionForCooperator,
  onAddAssignmentForCooperator,
  
  // Exceptions
  exceptions,
  onAddException,
  onRemoveException,
  
  // Assignments
  assignments,
  onAddAssignment,
  onRemoveAssignment,
}) => {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto py-4 px-4 flex flex-col h-full">
        <ScaleHeader
          onSave={onSave}
          className="mb-3"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 overflow-hidden">
          <div className="lg:col-span-2 overflow-hidden">
            <div className="bg-card rounded-lg shadow-sm border h-full animate-fade-in flex flex-col">
              <h2 className="text-xl font-semibold m-4 mb-2">Cooperadores</h2>
              <CooperatorList
                allCooperators={cooperatorsWithFlags}
                selectedCooperatorIds={selectedCooperatorIds}
                onToggle={onToggleCooperator}
                onAddException={onAddExceptionForCooperator}
                onAddAssignment={onAddAssignmentForCooperator}
                className="flex-1 overflow-hidden"
              />
            </div>
          </div>
          
          <div className="grid grid-rows-2 gap-3 h-full animate-fade-in animation-delay-100">
            <ExceptionList
              exceptions={exceptions}
              cooperators={mockCooperators}
              onAddException={onAddException}
              onRemoveException={onRemoveException}
              className="h-full overflow-hidden"
            />
            
            <ScheduleAssignmentList
              assignments={assignments}
              cooperators={mockCooperators}
              onAddAssignment={onAddAssignment}
              onRemoveAssignment={onRemoveAssignment}
              className="h-full overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleLayout;
