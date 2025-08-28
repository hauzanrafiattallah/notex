import { ISelectedTask, ITask } from "@/types/Task";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

interface TaskCardProps {
  task: ITask;
  key?: string;
  setSelectedTask: ({ activity, task }: ISelectedTask) => void;
}

const TaskCard = (props: TaskCardProps) => {
  const { task, key, setSelectedTask } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.task.id,
  });

  const [showDropdowns, setShowDropdowns] = useState(false);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      key={key}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex justify-between cursor-grab rounded-lg bg-neutral-50 p-4 shadow-sm hover:shadow-md"
    >
      <div>
        <h3 className="font-medium text-neutral-700">{task.title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{task.description}</p>
      </div>

      <div
        className="cursor-pointer relative h-fit"
        onMouseEnter={() => setShowDropdowns(true)}
        onMouseLeave={() => setShowDropdowns(false)}
      >
        <HiDotsHorizontal />
        <div
          className={`absolute right-0 top-0 p-2 w-48 rounded-lg bg-white shadow-md transition-all duration-200 ${
            showDropdowns ? "flex flex-col" : "hidden"
          }`}
        >
          <div
            className="cursor-pointer p-2 rounded-md hover:bg-neutral-100"
            onMouseDown={() => setSelectedTask({ activity: "edit", task })}
          >
            Edit
          </div>
          <div
            className="cursor-pointer p-2 rounded-md hover:bg-neutral-100 text-red-500"
            onMouseDown={() => setSelectedTask({ activity: "delete", task })}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
