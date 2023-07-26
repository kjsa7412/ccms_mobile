import React from "react";
import "./AppContainer.css";


type Props = {
  children: string | JSX.Element | JSX.Element[];
}

const AppContainer = ({children}: Props): JSX.Element =>
  <div className="app-container-parent">{children}</div>

export default AppContainer;
