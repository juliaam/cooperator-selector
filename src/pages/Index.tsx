import React from "react";
import { useScheduleState, mockCooperators } from "@/hooks/useScheduleState";
import ExceptionModal from "@/components/ExceptionModal";
import ScheduleAssignmentModal from "@/components/ScheduleAssignmentModal";
import ScaleLayout from "@/components/ScaleLayout";

const Index = () => {
  const {
    // Scale details
    scaleName,
    setScaleName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,

    // Cooperators
    cooperatorsWithFlags,
    selectedCooperatorIds,
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
        // Scale details
        scaleName={scaleName}
        onScaleNameChange={setScaleName}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
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
