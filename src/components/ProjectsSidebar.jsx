import { useContext } from "react";
import { StateContext } from "../store/StateContext";

export default function ProjectsSidebar() {
  const { handleStartAddProject } = useContext(StateContext);
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200 ">
        Your Projects
      </h2>
      <div>
        <button
          className="px-4 py-2 text-sm md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          onClick={handleStartAddProject}
        >
          + Add Project
        </button>
      </div>
      <ul>
        <li>List of projects will go here</li>
      </ul>
    </aside>
  );
}
