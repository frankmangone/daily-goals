import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDailyGoals } from "../../contexts/[date]/context.provider";

export default function TodoInput() {
  const { newGoal, setNewGoal, error, setError, addTask } = useDailyGoals();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGoal(e.target.value);
    setError("");
  };

  return (
    <>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Add a task for today..."
          value={newGoal}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className={error ? "border-red-500" : ""}
        />
        <Button onClick={addTask}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      <p className="text-red-500 text-sm mt-1 mb-1 h-[20px]">{error}</p>
    </>
  );
}
