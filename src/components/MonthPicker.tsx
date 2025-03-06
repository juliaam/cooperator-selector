import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const MonthPicker = ({ name }: { name: string }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [open, setOpen] = useState(false);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const previousYear = () => setSelectedYear(selectedYear - 1);
  const nextYear = () => setSelectedYear(selectedYear + 1);

  const selectMonth = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
          name={name}
        >
          {months[selectedMonth]} {selectedYear}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-2">
          <div className="mb-2 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={previousYear}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">{selectedYear}</div>
            <Button variant="ghost" size="icon" onClick={nextYear}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                variant={selectedMonth === index ? "default" : "ghost"}
                className="h-9"
                onClick={() => selectMonth(index)}
              >
                {month.substring(0, 3)}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MonthPicker;
