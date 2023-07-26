import React, {ReactNode} from "react";
import "./ScreenContainer.css";

interface Props {
    children: ReactNode;
    isColor?: boolean;
}

const ScreenContainer = ({children, isColor = false}: Props): JSX.Element => (
    <div className={`screen-container-parent ${isColor && "color"}`}>
        {children}
    </div>
);

export default ScreenContainer;
