import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Edit, MoreVertical, Trash, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface TaskProps {
  id: number;
  text: string;
  completed: boolean;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  moveTaskToTomorrow: (id: number) => void;
  editTask: (id: number, text: string) => void;
}

export default function Task(props: TaskProps) {
  const {
    id,
    text,
    completed,
    toggleTask,
    removeTask,
    moveTaskToTomorrow,
    editTask,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [error, setError] = useState("");

  const handleChange = (text: string) => {
    setEditedText(text);
    setError("");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(text);
  };

  const handleSubmit = () => {
    if (editedText.trim() === "") {
      setError("Task text cannot be empty");
    } else {
      editTask(id, editedText);
      setIsEditing(false);
      setError("");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(text);
    setError("");
  };

  return (
    <Card
      className={`p-4 pr-3 flex items-center justify-between h-14 transition-colors ${
        completed
          ? "border-gray-300 bg-gray-100 text-gray-500"
          : "border-border text-foreground"
      }`}
    >
      {isEditing ? (
        <div className="flex items-center space-x-2 flex-grow">
          <Input
            value={editedText}
            onChange={(e) => handleChange(e.target.value)}
            className={`flex-grow ml-[-0.25rem] ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Enter task text"
          />
          <Button onClick={handleSubmit} size="icon" variant="ghost">
            <Check className="h-4 w-4" />
          </Button>
          <Button onClick={handleCancel} size="icon" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2 flex-grow">
          <Checkbox
            id={`task-${id}`}
            checked={completed}
            onCheckedChange={() => toggleTask(id)}
          />
          <Label
            htmlFor={`task-${id}`}
            className={`text-sm cursor-pointer ${
              completed ? "line-through" : ""
            }`}
          >
            {text}
          </Label>
        </div>
      )}
      {!isEditing && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
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
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </Card>
  );
}
