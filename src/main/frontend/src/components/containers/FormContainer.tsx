import React from "react";
import "./FormContainer.css";


type Props = {
    children: string | JSX.Element | JSX.Element[];
    onSubmit: Function;
}

const FormContainer = ({children, onSubmit}: Props): JSX.Element =>
    <form className="form-container-parent" onSubmit={() => onSubmit}>{children}</form>

export default FormContainer;
