import { IColumn, ITask } from "@/types/Task";

const COLUMNS: IColumn[] = [
  {
    id: "TODO",
    title: "To Do",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
  },
  {
    id: "DONE",
    title: "Done",
  },
];

const INITIAL_TASKS: ITask[] = [
  {
    id: "1",
    title: "Project Documentation",
    description: "Complete the project documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "API Development",
    description: "Develop the REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    title: "UI Design",
    description: "Design the user interface",
    status: "DONE",
  },
];

export { COLUMNS, INITIAL_TASKS };
