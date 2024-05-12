import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { StateContext } from "./store/StateContext";

import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

const App = () => {
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

  const appCtx = {
    projectsState,
    handleStartAddProject,
    handleAddProject,
  };

  let content = <SelectedProject />;

  // Adding new project on null value
  if (projectsState.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <StateContext.Provider value={appCtx}>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar />
        {content}
      </main>
    </StateContext.Provider>
  );
};

export default App;
