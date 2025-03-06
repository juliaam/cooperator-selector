
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import CooperatorCard, { Cooperator } from "./CooperatorCard";
import { Search, Users, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CooperatorListProps {
  allCooperators: Cooperator[];
  selectedCooperatorIds: string[];
  onToggle: (id: string) => void;
  onAddException: (id: string) => void;
  onAddAssignment: (id: string) => void;
  className?: string;
}

const CooperatorList: React.FC<CooperatorListProps> = ({
  allCooperators,
  selectedCooperatorIds,
  onToggle,
  onAddException,
  onAddAssignment,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "selected">("all");
  
  const filteredCooperators = allCooperators.filter(coop => 
    coop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coop.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedCooperators = filteredCooperators.filter(coop => 
    selectedCooperatorIds.includes(coop.id)
  );
  
  const unselectedCooperators = filteredCooperators.filter(coop => 
    !selectedCooperatorIds.includes(coop.id)
  );
  
  const displayCooperators = activeTab === "all" 
    ? [...selectedCooperators, ...unselectedCooperators]
    : selectedCooperators;

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="mb-2 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cooperadores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "selected")} className="flex-shrink-0">
          <TabsList className="h-8">
            <TabsTrigger value="all" className="text-xs px-2 py-1 h-6 gap-1">
              <Users className="h-3 w-3" />
              <span className="hidden sm:inline">Todos</span>
              <span className="ml-1 text-xs bg-muted px-1 py-0.5 rounded-full">
                {allCooperators.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="selected" className="text-xs px-2 py-1 h-6 gap-1">
              <UserCheck className="h-3 w-3" />
              <span className="hidden sm:inline">Selecionados</span>
              <span className="ml-1 text-xs bg-primary/10 text-primary px-1 py-0.5 rounded-full">
                {selectedCooperatorIds.length}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="text-xs text-muted-foreground mb-2 px-0.5">
        {activeTab === "all" 
          ? `${filteredCooperators.length} cooperadores encontrados` 
          : `${selectedCooperatorIds.length} cooperadores selecionados`
        }
      </div>
      
      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-2 pb-2">
          {displayCooperators.length > 0 ? (
            displayCooperators.map((cooperator) => (
              <CooperatorCard
                key={cooperator.id}
                cooperator={cooperator}
                isSelected={selectedCooperatorIds.includes(cooperator.id)}
                onToggle={onToggle}
                onAddException={onAddException}
                onAddAssignment={onAddAssignment}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="bg-muted w-12 h-12 flex items-center justify-center rounded-full mb-2">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-sm mb-1">Nenhum cooperador encontrado</h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                {activeTab === "all" 
                  ? "Tente ajustar sua busca ou adicione novos cooperadores."
                  : "Selecione cooperadores para incluir na escala."
                }
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CooperatorList;
