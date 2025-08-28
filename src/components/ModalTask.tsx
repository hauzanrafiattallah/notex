import { FormEvent } from "react";
import Button from "./Button";

interface ModalTaskProps {
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ModalTask = (props: ModalTaskProps) => {
  const { onCancel, onSubmit } = props;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg text-neutral-700 font-bold">Add Task</h2>
        <form onSubmit={onSubmit} action="" className="space-y-4">
          <label htmlFor="title" className="flex flex-col gap-1">
            <span className="text-md font-semibold text-neutral-600">
              Title
            </span>
            <input
              type="text"
              placeholder="Insert Task Title"
              className="rounded-lg border border-neutral-300 p-2"
              required
              id="title"
              name="title"
            />
          </label>
          <label htmlFor="description" className="flex flex-col gap-1">
            <span className="text-md font-semibold text-neutral-600">
              Description
            </span>
            <textarea
              placeholder="Insert Task Description"
              className="rounded-lg resize-none border border-neutral-300 p-2"
              required
              id="description"
              name="description"
            />
          </label>
          <div className="flex w-full items-center justify-end gap-2">
            <Button
              type="button"
              onClick={onCancel}
              className="bg-red-500 hover:bg-red-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => onSubmit}
              className="bg-green-500 hover:bg-green-600"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTask;
