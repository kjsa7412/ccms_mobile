import React, {ReactNode} from "react";
import "./ScreenContainer.css";

interface Props {
    children: ReactNode;
    isColor?: boolean;
    flexEnd?: boolean;
}

const ScreenContainer = ({children, isColor = false, flexEnd = false}: Props): JSX.Element => (
    <div className={`screen-container-parent ${isColor && "color"} ${flexEnd && "flexEnd"}`}>
        {children}
    </div>
);

export default ScreenContainer;
