import { useContext } from "react";

import { LiaFlagCheckeredSolid } from "react-icons/lia";

import { StateContext } from "../store/AppStateContext.jsx";

export default function SelectedProjectStatusIcon() {
  const { selectedProject } = useContext(StateContext);

  const classes =
    selectedProject.status === "pending" ? " text-red-500" : " text-green-500";

  return (
    <span className={classes}>
      <LiaFlagCheckeredSolid />
    </span>
  );
}
