import { useContext } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { StateContext } from "../store/StateContext";

import NewTask from "./NewTask";

export default function Tasks() {
  const { deleteTask, selectedProjectTasks } = useContext(StateContext);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {selectedProjectTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {selectedProjectTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {selectedProjectTasks.map((task) => (
            <li key={task.taskId} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => deleteTask(task.taskId)}
              >
                <RiDeleteBin6Fill title="Delete Task" size="1.25em" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
