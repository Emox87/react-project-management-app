import { useContext } from "react";

import { StateContext } from "./store/StateContext";

import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

const App = () => {
  console.log("APP Render");

  const { selectedProjectId } = useContext(StateContext);

  let content = <SelectedProject />;

  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar />
        {content}
      </main>
    </>
  );
};

export default App;
