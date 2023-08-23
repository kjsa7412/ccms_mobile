import './RowContents.css'

type Props = {
    title: string | undefined;
    contents: string | undefined;
}

const RowContents = ({title, contents}: Props) => {
    return (
        <div className={"rowContents-baseContainer"}>
            <div className={"rowContents-title"}>{!!title ? title : ""}</div>
            <div className={"rowContents-contents"}>{!!contents ? contents : ""}</div>
        </div>
    )
}

export default RowContents;