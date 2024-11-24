import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GoalProps {
  id: number;
  text: string;
  completed: boolean;
  isCustom: boolean;
  toggleGoal: (id: number, isCustom: boolean) => void;
  removeGoal: (id: number) => void;
}

export default function Goal(props: GoalProps) {
  const { id, text, completed, isCustom, toggleGoal, removeGoal } = props;

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
          onCheckedChange={() => toggleGoal(id, isCustom)}
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
      {isCustom && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeGoal(id)}
          className="ml-2"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Card>
  );
}
