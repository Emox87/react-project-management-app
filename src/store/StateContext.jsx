import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const StateContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
});

export default function AppStateContextProvider({ children }) {
  // App component initial state
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = uuidv4();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function findProjectById(id) {
    return projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    );
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  function handleAddTask(task) {
    setProjectsState((prevState) => {
      const projectId = uuidv4();
      const newTask = {
        taskId: projectId,
        projectId: prevState.selectedProjectId,
        text: task,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.taskId !== id),
      };
    });
  }

  const ctx = {
    projects: projectsState.projects,
    selectedProjectId: projectsState.selectedProjectId,
    selectedProjectTasks: projectsState.tasks.filter(
      (task) => task.projectId === projectsState.selectedProjectId
    ),
    handleStartAddProject,
    addProject: handleAddProject,
    selectProject: handleSelectProject,
    deleteProject: handleDeleteProject,
    cancelProject: handleCancelAddProject,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    findProjectById,
  };

  return <StateContext.Provider value={ctx}>{children}</StateContext.Provider>;
}
