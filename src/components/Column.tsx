import { IColumn, ISelectedTask, ITask } from "@/types/Task";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
  key?: string;
  setSelectedTask: ({ activity, task }: ISelectedTask) => void;
}

const Column = (props: ColumnProps) => {
  const { column, tasks, key, setSelectedTask } = props;
  const { setNodeRef, over } = useDroppable({
    id: column.id,
  });

  return (
    <div
      key={key}
      className={`flex flex-1 flex-col w-80 rounded-lg bg-neutral-100 p-4 ${
        over?.id === column.id && "bg-neutral-200 outline-2 outline-blue-300 "
      }`}
    >
      <h2 className="font-semibold text-neutral-700 mb-4">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-col flex-1 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            setSelectedTask={setSelectedTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
