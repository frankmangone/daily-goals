import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskProps {
  id: number;
  text: string;
  completed: boolean;
  isCustom: boolean;
  toggleTask: (id: number, isCustom: boolean) => void;
  removeTask: (id: number) => void;
  moveTaskToTomorrow: (id: number) => void;
}

export default function Task(props: TaskProps) {
  const {
    id,
    text,
    completed,
    isCustom,
    toggleTask,
    removeTask,
    moveTaskToTomorrow,
  } = props;

  return (
    <Card
      className={`p-4 flex items-center justify-between h-14 transition-colors ${
        completed
          ? "border-gray-300 bg-gray-100 text-gray-500"
          : "border-border text-foreground"
      }`}
    >
      <div className="flex items-center space-x-2 flex-grow">
        <Checkbox
          id={`goal-${id}`}
          checked={completed}
          onCheckedChange={() => toggleTask(id, isCustom)}
        />
        <Label
          htmlFor={`goal-${id}`}
          className={`text-sm cursor-pointer ${
            completed ? "line-through" : ""
          }`}
        >
          {text}
        </Label>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-2">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => removeTask(id)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => moveTaskToTomorrow(id)}>
            <ArrowRight className="mr-2 h-4 w-4" />
            <span>Move to Tomorrow</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}