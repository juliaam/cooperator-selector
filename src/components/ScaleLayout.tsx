import React from "react";
import CooperatorList from "@/components/CooperatorList";
import ScaleHeader from "@/components/ScaleHeader";
import ExceptionList from "@/components/ExceptionList";
import ScheduleAssignmentList from "@/components/ScheduleAssignmentList";
import { mockCooperators } from "@/hooks/useScheduleState";
import { Button } from "./ui/button";
import { Users2 } from "lucide-react";

interface ScaleLayoutProps {
  // Scale details
  scaleName: string;
  monthName: string;

  // Cooperators
  cooperatorsWithFlags: typeof mockCooperators;
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
  monthName,

  // Cooperators
  cooperatorsWithFlags,
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
          monthName={monthName}
          className="mb-3"
        />

        <div className="grid flex-1 grid-cols-1 gap-3 overflow-hidden lg:grid-cols-3">
          <div className="overflow-hidden lg:col-span-2">
            <div className="flex h-full animate-fade-in flex-col rounded-lg border bg-card p-4 shadow-sm">
              <div className="m-2 flex justify-between">
                <h2 className="text-xl font-semibold">Cooperadores</h2>
                <Button>
                  Gerenciar cooperadores <Users2 />
                </Button>
              </div>
              <CooperatorList
                allCooperators={cooperatorsWithFlags}
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
