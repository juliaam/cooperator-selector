
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { X, Clock } from "lucide-react";

export interface Cooperator {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  hasExceptions?: boolean;
}

interface CooperatorCardProps {
  cooperator: Cooperator;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onAddException: (id: string) => void;
  className?: string;
}

const CooperatorCard: React.FC<CooperatorCardProps> = ({
  cooperator,
  isSelected,
  onToggle,
  onAddException,
  className,
}) => {
  return (
    <Card 
      className={cn(
        "relative flex items-center p-4 hover-lift transition-all-200",
        isSelected ? "bg-secondary border-primary/30" : "opacity-60",
        cooperator.hasExceptions && "ring-1 ring-amber-400",
        className
      )}
    >
      <div 
        className="absolute top-2 right-2 flex space-x-1"
      >
        {cooperator.hasExceptions && (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Exceção
          </Badge>
        )}
      </div>
      
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage src={cooperator.avatarUrl} alt={cooperator.name} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {cooperator.name.split(' ').map(part => part[0]).join('').substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{cooperator.name}</h3>
        <p className="text-xs text-muted-foreground truncate">{cooperator.role}</p>
      </div>
      
      <div className="flex items-center space-x-2 ml-2">
        {isSelected ? (
          <button
            onClick={() => onToggle(cooperator.id)}
            className="p-1.5 rounded-full text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Remover cooperador"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => onToggle(cooperator.id)}
            className="bg-primary text-white text-xs font-medium py-1 px-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Adicionar
          </button>
        )}
        
        <button
          onClick={() => onAddException(cooperator.id)}
          className="p-1.5 rounded-full text-muted-foreground hover:bg-secondary-foreground/10 transition-colors"
          aria-label="Adicionar exceção"
        >
          <Clock className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};

export default CooperatorCard;
