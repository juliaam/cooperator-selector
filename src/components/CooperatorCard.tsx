import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { X, Clock, Calendar } from "lucide-react";

export interface Cooperator {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  hasExceptions?: boolean;
  hasAssignments?: boolean;
}

interface CooperatorCardProps {
  cooperator: Cooperator;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onAddException: (id: string) => void;
  onAddAssignment: (id: string) => void;
  className?: string;
}

const CooperatorCard: React.FC<CooperatorCardProps> = ({
  cooperator,
  isSelected,
  onToggle,
  onAddException,
  onAddAssignment,
  className,
}) => {
  return (
    <Card
      className={cn(
        "hover-lift transition-all-200 relative flex items-center p-4",
        isSelected ? "border-primary/30 bg-secondary" : "opacity-60",
        cooperator.hasExceptions && "ring-1 ring-amber-400",
        cooperator.hasAssignments &&
          !cooperator.hasExceptions &&
          "ring-1 ring-green-400",
        cooperator.hasExceptions &&
          cooperator.hasAssignments &&
          "ring-1 ring-blue-400",
        className
      )}
    >
      <div className="absolute right-2 top-2 flex space-x-1">
        {cooperator.hasExceptions && (
          <Badge
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700"
          >
            <Clock className="mr-1 h-3 w-3" />
            Exceção
          </Badge>
        )}
        {cooperator.hasAssignments && (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            <Calendar className="mr-1 h-3 w-3" />
            Agendado
          </Badge>
        )}
      </div>

      <Avatar className="mr-4 h-12 w-12">
        <AvatarImage src={cooperator.avatarUrl} alt={cooperator.name} />
        <AvatarFallback className="bg-primary/10 font-medium text-primary">
          {cooperator.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium">{cooperator.name}</h3>
        <p className="truncate text-xs text-muted-foreground">
          {cooperator.role}
        </p>
      </div>

      <div className="ml-2 flex items-center space-x-2">
        {isSelected ? (
          <button
            onClick={() => onToggle(cooperator.id)}
            className="rounded-full p-1.5 text-destructive transition-colors hover:bg-destructive/10"
            aria-label="Remover cooperador"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => onToggle(cooperator.id)}
            className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-primary/90"
          >
            Adicionar
          </button>
        )}

        <button
          onClick={() => onAddException(cooperator.id)}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary-foreground/10"
          aria-label="Adicionar exceção"
        >
          <Clock className="h-4 w-4" />
        </button>

        <button
          onClick={() => onAddAssignment(cooperator.id)}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary-foreground/10"
          aria-label="Agendar cooperador"
        >
          <Calendar className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};

export default CooperatorCard;
