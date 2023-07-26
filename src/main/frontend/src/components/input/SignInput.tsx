import './SignInput.css'
import {Icons} from "../icons";
import {EIcon} from "@custom-enums/common-enum";
import {useState} from "react";

type Props = {
    name: string,
    label: string,
    placeholder: string,
    onChange: Function,
    methods: any
    type?: string
}

const SignInput = ({name, label, placeholder, onChange, methods, type = 'text'}: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="signInput-baseContainer">
            <div className="signInput-labelContainer">
                <p>{label}</p>
            </div>
            <div className="signInput-inputContainer">
                <input
                    type={type}
                    className="signInput-inputBox"
                    spellCheck="false"
                    placeholder={placeholder}
                    {...methods.register(name, {
                        onChange: () => {
                            onChange();
                            !!methods.getValues()[name] ?
                                setVisible(true) :
                                setVisible(false)
                        },
                    })}
                />
                {
                    visible &&
                    <div className="signInput-clearButton" onClick={() => {
                        methods.setValue(name, "");
                        setVisible(false);
                    }}>
                        <Icons iconType={EIcon.Close} fill={"black"} width={"15"} height={"15"}/>
                    </div>
                }
            </div>
            <div className="signInput-line"/>
        </div>
    )
}

export default SignInput