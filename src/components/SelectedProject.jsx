import { useContext } from "react";

import { StateContext } from "../store/AppStateContext.jsx";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { LiaFlagCheckeredSolid } from "react-icons/lia";

import Tasks from "./Tasks.jsx";
import SelectedProjectStatusIcon from "./SelectedProjectStatusIcon.jsx";

export default function SelectedProject() {
  const { selectedProject, deleteProject, addTask, deleteTask } =
    useContext(StateContext);

  const formattedDate = new Date(selectedProject.dueDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {selectedProject.title}
          </h1>
          <button
            onClick={deleteProject}
            className=" hover:text-red-500"
            title="Delete Project"
          >
            <RiDeleteBin5Fill size="1.3em" />
          </button>
        </div>
        <p className="mb-4 text-stone-400 flex items-center">
          <span
            className={
              selectedProject.status === "pending"
                ? " text-red-500"
                : "text-green-500"
            }
          >
            <LiaFlagCheckeredSolid title="Due Date" />
          </span>
          <span className="mx-2">{formattedDate}</span>
        </p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {selectedProject.description}
        </p>
      </header>
      <Tasks />
    </div>
  );
}
