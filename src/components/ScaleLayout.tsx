import React from "react";
import CooperatorList from "@/components/CooperatorList";
import ScaleHeader from "@/components/ScaleHeader";
import ExceptionList from "@/components/ExceptionList";
import ScheduleAssignmentList from "@/components/ScheduleAssignmentList";
import { mockCooperators } from "@/hooks/useScheduleState";
import { ExceptionData } from "@/components/ExceptionModal";

interface ScaleLayoutProps {
  // Scale details
  scaleName: string;
  onScaleNameChange: (name: string) => void;
  startDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  endDate: Date | undefined;
  onEndDateChange: (date: Date | undefined) => void;
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
  // Scale details
  scaleName,
  onScaleNameChange,
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
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto flex h-full flex-col px-4 py-4">
        <ScaleHeader
          scaleName={scaleName}
          onScaleNameChange={onScaleNameChange}
          onSave={onSave}
          className="mb-3"
        />

        <div className="grid flex-1 grid-cols-1 gap-3 overflow-hidden lg:grid-cols-3">
          <div className="overflow-hidden lg:col-span-2">
            <div className="flex h-full animate-fade-in flex-col rounded-lg border bg-card p-4 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">Cooperadores</h2>
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

          <div className="animation-delay-100 grid h-full animate-fade-in grid-rows-2 gap-3">
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
