
import React from 'react';
import { useScheduleState, mockCooperators } from '@/hooks/useScheduleState';
import ExceptionModal from '@/components/ExceptionModal';
import ScheduleAssignmentModal from '@/components/ScheduleAssignmentModal';
import ScaleLayout from '@/components/ScaleLayout';

const Index = () => {
  const {
    // Form
    form,
    
    // Scale details (for use in components that need direct access)
    scaleName,
    startDate,
    endDate,
    selectedCooperatorIds,
    
    // Cooperators
    cooperatorsWithFlags,
    handleToggleCooperator,
    
    // Exceptions
    exceptions,
    isExceptionModalOpen,
    setIsExceptionModalOpen,
    selectedCooperatorForException,
    handleAddExceptionForCooperator,
    handleAddException,
    handleSaveException,
    handleRemoveException,
    
    // Assignments
    assignments,
    isAssignmentModalOpen,
    setIsAssignmentModalOpen,
    selectedCooperatorForAssignment,
    handleAddAssignmentForCooperator,
    handleSaveAssignment,
    handleRemoveAssignment,
    
    // Save
    handleSaveScale,
  } = useScheduleState();

  return (
    <>
      <ScaleLayout
        // Form
        form={form}
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
    </>
  );
};

export default Index;
