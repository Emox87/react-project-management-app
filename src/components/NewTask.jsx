import { useState, useContext } from "react";

import { StateContext } from "../store/StateContext";

export default function NewTask() {
  const [enteredTask, setEnteredTask] = useState("");
  const { addTask } = useContext(StateContext);

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }

    addTask(enteredTask);
    setEnteredTask("");
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleClick();
    } else {
      return;
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={() => {
          addTask(enteredTask);
          setEnteredTask("");
        }}
      >
        Add Task
      </button>
    </div>
  );
}
