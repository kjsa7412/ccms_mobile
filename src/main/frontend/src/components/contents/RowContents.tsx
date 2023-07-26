import './RowContents.css'

type Props = {
    title: string;
    contents: string;
}

const RowContents = ({title, contents}: Props) => {
    return (
        <div className={"rowContents-baseContainer"}>
            <div className={"rowContents-title"}>{title}</div>
            <div className={"rowContents-contents"}>{contents}</div>
        </div>
    )
}

export default RowContents;