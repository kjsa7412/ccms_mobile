import LoadingBox from "../loading/LoadingBox";
import './UpsertSubmitButton.css';

type Props = {
    value: string;
    isLoading: boolean;
    disabled?: boolean;
}

const UpsertSubmitButton = ({value, isLoading, disabled = false}: Props) => {
    return (
        <div className={"upsertSubmitButton-baseContainer"}>
            {disabled ? (
                <LoadingBox pHeight={45}/>
            ) : isLoading ? (
                <div className={"upsertSubmitButton-Loading"}>
                    <img src={`${process.env.PUBLIC_URL}/img/Spinner-1s-38px.gif`}/>
                </div>
            ) : (
                <input className={"upsertSubmitButton-button"} type="Submit" value={value} readOnly={true}/>
            )}
        </div>
    )
}
export default UpsertSubmitButton;