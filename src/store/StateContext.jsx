import { createContext } from "react";

export const StateContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  handleStartAddProject: () => {},
  handleAddProject: () => {},
  handleCancelAddProject: () => {},
  handleSelectProject: () => {},
  handleDeleteProject: () => {},
  handleAddTask: () => {},
  handleDeleteTask: () => {},
});
