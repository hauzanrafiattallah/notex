import { IColumn, ITask } from "@/types/Task";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
  key?: string;
}

const Column = (props: ColumnProps) => {
  const { column, tasks, key } = props;
  return (
    <div key={key} className="flex flex-1 flex-col w-80 rounded-lg bg-neutral-100 p-4">
      <h2 className="font-semibold text-neutral-700 mb-4">{column.title}</h2>
      <div className="flex flex-col flex-1 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
