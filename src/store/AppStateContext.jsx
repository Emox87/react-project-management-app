import { createContext, useState, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const StateContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
});

function reducer(state, action) {
  switch (action.type) {
    case "START_ADD_PROJECT": {
      return {
        ...state,
        selectedProjectId: null,
      };
    }
    case "ADD_PROJECT": {
      const projectId = uuidv4();
      const newProject = {
        ...action.payload.projectData,
        id: projectId,
        status: action.payload.status,
      };
      return {
        ...state,
        selectedProjectId: undefined,
        projects: [...state.projects, newProject],
      };
    }
    case "CANCEL_PROJECT": {
      return {
        ...state,
        selectedProjectId: undefined,
      };
    }
    case "SELECT_PROJECT": {
      return {
        ...state,
        selectedProjectId: action.payload.id,
      };
    }
    case "DELETE_PROJECT": {
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter(
          (project) => project.id !== state.selectedProjectId
        ),
      };
    }
    case "ADD_TASK": {
      const taskId = uuidv4();
      const newTask = {
        text: action.payload.text,
        projectId: state.selectedProjectId,
        id: taskId,
        status: action.payload.status,
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    }
  }
}

export default function AppContextProvider({ children }) {
  const [projectsState, dispatch] = useReducer(reducer, {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  // useEffect(() => {
  //   fetch("http://localhost:3000/projects")
  //     .then((response) => response.json)
  //     .then((data) => handleAddProject(data));
  // }, []);

  function handleStartAddProject() {
    dispatch({ type: "START_ADD_PROJECT" });
  }

  function handleAddProject(projectData, status = "pending") {
    dispatch({
      type: "ADD_PROJECT",
      payload: {
        projectData,
        status,
      },
    });
  }

  function handleCancelAddProject() {
    dispatch({ type: "CANCEL_PROJECT" });
  }

  function handleSelectProject(id) {
    dispatch({ type: "SELECT_PROJECT", payload: { id } });
  }

  function handleDeleteProject() {
    dispatch({ type: "DELETE_PROJECT" });
  }

  function handleAddTask(text, status = "pending") {
    dispatch({ type: "ADD_TASK", payload: { text, status } });
  }

  function handleDeleteTask(id) {
    dispatch({ type: "DELETE_TASK", payload: { id } });
  }

  const ctx = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    selectedProject: projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    ),
    startAddProject: handleStartAddProject,
    addProject: handleAddProject,
    cancelProject: handleCancelAddProject,
    deleteProject: handleDeleteProject,
    selectProject: handleSelectProject,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
  };

  return <StateContext.Provider value={ctx}>{children}</StateContext.Provider>;
}
