import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Cooperator } from "./CooperatorCard";
import { cn } from "@/lib/utils";
import { ExceptionData } from "@/shared/types/Exception";

interface ExceptionListProps {
  exceptions: Array<ExceptionData & { id: string }>;
  cooperators: Cooperator[];
  onAddException: () => void;
  onRemoveException: (id: string) => void;
  className?: string;
}

const ExceptionList: React.FC<ExceptionListProps> = ({
  exceptions,
  cooperators,
  onAddException,
  onRemoveException,
  className,
}) => {
  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <CardHeader className="flex-shrink-0 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Exceções</CardTitle>
            <CardDescription className="text-xs">
              Adicione dias específicos ou recorrentes onde um cooperador não
              pode participar
            </CardDescription>
          </div>
          <Button onClick={onAddException} size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-2 pt-0">
        <ScrollArea className="h-full">
          {exceptions.length > 0 ? (
            <div className="space-y-2 pr-2">
              {exceptions.map((exception) => {
                const cooperator = cooperators?.find(
                  (c) => c.id === exception.cooperatorId
                );

                return (
                  <div
                    key={exception.id}
                    className="group flex items-center gap-3 rounded-md bg-secondary p-3"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary-foreground/5">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">
                          {cooperator?.name || "Cooperador"}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-primary/20 bg-primary/5 text-primary"
                        >
                          Data única
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {exception.date && (
                          <span>
                            Data: {format(exception.date, "dd/MM/yyyy")}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => onRemoveException?.(exception.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-4 text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-1 text-sm font-medium">
                Nenhuma exceção adicionada
              </h3>
              <p className="mb-2 max-w-xs text-xs text-muted-foreground">
                Adicione exceções para dias específicos ou recorrentes onde um
                cooperador não pode participar da escala.
              </p>
              <Button
                onClick={onAddException}
                variant="outline"
                size="sm"
                className="gap-1"
              >
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
