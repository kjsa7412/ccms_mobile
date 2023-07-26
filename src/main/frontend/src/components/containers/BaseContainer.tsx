import React from "react";
import "./BaseContainer.css";


type Props = {
  children: string | JSX.Element | JSX.Element[];
}

const BaseContainer = ({children}: Props): JSX.Element =>
  <div className="base-container-parent">{children}</div>

export default BaseContainer;
