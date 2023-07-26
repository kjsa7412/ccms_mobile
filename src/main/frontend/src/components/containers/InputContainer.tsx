import './InputContainer.css';

interface Props {
    children: string | JSX.Element | JSX.Element[];
}

const InputContainer = ({children}: Props) => {
    return (
        <div className={"inputContainer-input"}>{children}</div>
    )
}

export default InputContainer;