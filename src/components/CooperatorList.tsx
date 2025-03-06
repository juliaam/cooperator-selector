
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
  className?: string;
}

const CooperatorList: React.FC<CooperatorListProps> = ({
  allCooperators,
  selectedCooperatorIds,
  onToggle,
  onAddException,
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
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cooperadores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "selected")} className="flex-shrink-0">
          <TabsList>
            <TabsTrigger value="all" className="gap-1.5">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Todos</span>
              <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                {allCooperators.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="selected" className="gap-1.5">
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Selecionados</span>
              <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {selectedCooperatorIds.length}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        {activeTab === "all" 
          ? `${filteredCooperators.length} cooperadores encontrados` 
          : `${selectedCooperatorIds.length} cooperadores selecionados`
        }
      </div>
      
      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-3 pb-4">
          {displayCooperators.length > 0 ? (
            displayCooperators.map((cooperator) => (
              <CooperatorCard
                key={cooperator.id}
                cooperator={cooperator}
                isSelected={selectedCooperatorIds.includes(cooperator.id)}
                onToggle={onToggle}
                onAddException={onAddException}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-muted w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Nenhum cooperador encontrado</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
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
