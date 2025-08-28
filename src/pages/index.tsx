import Button from "@/components/Button";
import Column from "@/components/Column";
import ModalConfirm from "@/components/ModalConfirm";
import ModalTask from "@/components/ModalTask";
import { COLUMNS } from "@/constants/Task.contstants";
import { ITask } from "@/types/Task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { FormEvent, useEffect, useState } from "react";
import { Toaster, toast } from "sonner"; // ⬅️ import sonner

const App = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showModalAddTask, setShowModalAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    activity: string;
    task: ITask | null;
  } | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as ITask["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
      toast.error("Title and description are required!", { id: "task-error" });
      return;
    }

    const newTask: ITask = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
      status: "TODO",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    event.currentTarget.reset();
    setShowModalAddTask(false);

    toast.success("Task created successfully!", { id: "task-create" });
  };

  const handleEditTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const editedTask: ITask = {
      id: selectedTask?.task?.id as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: selectedTask?.task?.status as ITask["status"],
    };

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );

    event.currentTarget.reset();
    setSelectedTask(null);

    toast.success("Task updated successfully!", { id: "task-edit" });
  };

  const handleDeleteTask = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== selectedTask?.task?.id)
    );
    setSelectedTask(null);

    toast.error("Task deleted!", { id: "task-delete" });
  };

  return (
    <main className="min-h-screen p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-700">Task Management</h1>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => setShowModalAddTask(true)}
        >
          Add Task
        </Button>
      </div>

      <div className="flex gap-8 flex-1">
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              setSelectedTask={setSelectedTask}
            />
          ))}
        </DndContext>
      </div>

      {showModalAddTask && (
        <ModalTask
          onCancel={() => setShowModalAddTask(false)}
          onSubmit={handleCreateTask}
        />
      )}
      {selectedTask?.activity === "edit" && selectedTask?.task && (
        <ModalTask
          type="edit"
          selectedTask={selectedTask.task}
          onSubmit={handleEditTask}
          onCancel={() => setSelectedTask(null)}
        />
      )}
      {selectedTask?.activity === "delete" && selectedTask?.task && (
        <ModalConfirm
          type="delete"
          onConfirm={handleDeleteTask}
          message="Are you sure you want to delete this task?"
          title="Delete Task"
          onCancel={() => setSelectedTask(null)}
        />
      )}

      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: { fontSize: "14px", borderRadius: "10px" },
        }}
      />
    </main>
  );
};

export default App;
