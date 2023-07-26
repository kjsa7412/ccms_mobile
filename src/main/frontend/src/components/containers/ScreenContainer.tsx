import React, {ReactNode} from "react";
import "./ScreenContainer.css";

interface Props {
  children: ReactNode;
  isColor?: boolean;
}

const ScreenContainer = ({children, isColor = false}: Props): JSX.Element => (
  <div className={isColor ? "screen-container-parent color" : "screen-container-parent"}>
    {children}
  </div>
);

export default ScreenContainer;
