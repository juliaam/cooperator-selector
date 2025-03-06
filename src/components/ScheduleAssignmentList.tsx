
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Cooperator } from './CooperatorCard';
import { AssignmentData } from './ScheduleAssignmentModal';
import { cn } from '@/lib/utils';

interface ScheduleAssignmentListProps {
  assignments: AssignmentData[];
  cooperators: Cooperator[];
  onAddAssignment: () => void;
  onRemoveAssignment: (id: string) => void;
  className?: string;
}

const ScheduleAssignmentList: React.FC<ScheduleAssignmentListProps> = ({
  assignments,
  cooperators,
  onAddAssignment,
  onRemoveAssignment,
  className,
}) => {
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Agendamentos</CardTitle>
            <CardDescription className="text-xs">
              Adicione datas específicas onde um cooperador deve participar
            </CardDescription>
          </div>
          <Button onClick={onAddAssignment} size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          {assignments.length > 0 ? (
            <div className="space-y-2 pr-2">
              {assignments.map((assignment) => {
                const cooperator = cooperators.find(c => c.id === assignment.cooperatorId);
                
                return (
                  <div key={assignment.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-md group">
                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {cooperator?.name || "Cooperador"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Data: {format(assignment.date, "dd/MM/yyyy")}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => onRemoveAssignment(assignment.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-4">
              <div className="bg-muted w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-sm mb-1">Nenhum agendamento adicionado</h3>
              <p className="text-xs text-muted-foreground max-w-xs mb-2">
                Adicione agendamentos para dias específicos onde um cooperador deve participar da escala.
              </p>
              <Button onClick={onAddAssignment} variant="outline" size="sm" className="gap-1">
                <Plus className="h-3 w-3" />
                <span>Adicionar Agendamento</span>
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ScheduleAssignmentList;
