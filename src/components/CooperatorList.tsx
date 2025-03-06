import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const filteredCooperators = allCooperators.filter(
    (coop) =>
      coop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coop.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCooperators = filteredCooperators.filter((coop) =>
    selectedCooperatorIds.includes(coop.id)
  );

  const unselectedCooperators = filteredCooperators.filter(
    (coop) => !selectedCooperatorIds.includes(coop.id)
  );

  const displayCooperators =
    activeTab === "all"
      ? [...selectedCooperators, ...unselectedCooperators]
      : selectedCooperators;

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="mb-2 flex items-center gap-2 px-2 py-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder="Buscar cooperadores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "all" | "selected")}
          className="flex-shrink-0"
        >
          <TabsList className="h-8">
            <TabsTrigger value="all" className="h-6 gap-1 px-2 py-1 text-xs">
              <Users className="h-3 w-3" />
              <span className="hidden sm:inline">Todos</span>
              <span className="ml-1 rounded-full bg-muted px-1 py-0.5 text-xs">
                {allCooperators.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="selected"
              className="h-6 gap-1 px-2 py-1 text-xs"
            >
              <UserCheck className="h-3 w-3" />
              <span className="hidden sm:inline">Selecionados</span>
              <span className="ml-1 rounded-full bg-primary/10 px-1 py-0.5 text-xs text-primary">
                {selectedCooperatorIds.length}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mb-2 px-0.5 text-xs text-muted-foreground">
        {activeTab === "all"
          ? `${filteredCooperators.length} cooperadores encontrados`
          : `${selectedCooperatorIds.length} cooperadores selecionados`}
      </div>

      <ScrollArea className="-mx-1 flex-1 px-1 pr-4">
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
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-1 text-sm font-medium">
                Nenhum cooperador encontrado
              </h3>
              <p className="max-w-xs text-xs text-muted-foreground">
                {activeTab === "all"
                  ? "Tente ajustar sua busca ou adicione novos cooperadores."
                  : "Selecione cooperadores para incluir na escala."}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CooperatorList;
