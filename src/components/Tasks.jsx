import { useContext } from "react";

import { StateContext } from "../store/AppStateContext.jsx";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

import NewTask from "./NewTask.jsx";

export default function Tasks() {
  const { tasks, deleteTask, selectedProjectId } = useContext(StateContext);
  const selectedProjectTasks = tasks.filter(
    (task) => task.projectId === selectedProjectId
  );

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {selectedProjectTasks.length === 0 && (
        <p className="text-stone-800 my-6">
          This project does not have any tasks yet.
        </p>
      )}
      {selectedProjectTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {selectedProjectTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center my-4"
            >
              <span
                className={
                  task.status === "pending" ? "text-red-500" : "text-green-500"
                }
              >
                {task.status === "pending" ? (
                  <MdOutlinePendingActions size="1.15em" />
                ) : (
                  <FaCircleCheck size="1.15em" />
                )}
              </span>
              <span>{task.text}</span>
              <button
                className=" hover:text-red-500"
                title="delete task"
                onClick={() => deleteTask(task.id)}
              >
                <RiDeleteBin5Fill size="1.15em" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
