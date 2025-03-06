
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Cooperator } from './CooperatorCard';
import { ExceptionData } from './ExceptionModal';
import { cn } from '@/lib/utils';

interface ExceptionListProps {
  exceptions: Array<ExceptionData & { id: string }>;
  cooperators: Cooperator[];
  onAddException: () => void;
  onRemoveException: (id: string) => void;
  className?: string;
}

const weekdayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

const ExceptionList: React.FC<ExceptionListProps> = ({
  exceptions,
  cooperators,
  onAddException,
  onRemoveException,
  className,
}) => {
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Exceções</CardTitle>
            <CardDescription className="text-xs">
              Adicione dias específicos ou recorrentes onde um cooperador não pode participar
            </CardDescription>
          </div>
          <Button onClick={onAddException} size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          {exceptions.length > 0 ? (
            <div className="space-y-2 pr-2">
              {exceptions.map((exception) => {
                const cooperator = cooperators.find(c => c.id === exception.cooperatorId);
                
                return (
                  <div key={exception.id} className="flex items-center gap-3 p-3 bg-secondary rounded-md group">
                    <div className="bg-secondary-foreground/5 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      {exception.type === "one-time" ? (
                        <Calendar className="h-5 w-5 text-primary" />
                      ) : (
                        <Clock className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">
                          {cooperator?.name || "Cooperador"}
                        </span>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          {exception.type === "one-time" ? "Data única" : "Recorrente"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {exception.type === "one-time" && exception.date ? (
                          <>Data: {format(exception.date, "dd/MM/yyyy")}</>
                        ) : exception.weekday ? (
                          <>Dia: {weekdayNames[parseInt(exception.weekday)]}</>
                        ) : null}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => onRemoveException(exception.id)}
                    >
                      <X className="h-4 w-4" />
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
              <h3 className="font-medium text-sm mb-1">Nenhuma exceção adicionada</h3>
              <p className="text-xs text-muted-foreground max-w-xs mb-2">
                Adicione exceções para dias específicos ou recorrentes onde um cooperador não pode participar da escala.
              </p>
              <Button onClick={onAddException} variant="outline" size="sm" className="gap-1">
                <Plus className="h-3 w-3" />
                <span>Adicionar Exceção</span>
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ExceptionList;
