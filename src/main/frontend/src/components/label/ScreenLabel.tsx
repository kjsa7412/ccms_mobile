import './ScreenLabel.css'

type TScreenLabel = {
  title?: string;
  count?: number;
}

const ScreenLabel = ({title, count}: TScreenLabel) => {
  return (
    <div className={"screenLabel-postHeaderContainer"}>
      <span className={"screenLabel-name"}>{title}</span>
      <span className={"screenLabel-count"}>{!!count ? count + "건" : ""}</span>
    </div>
  )
}

export default ScreenLabel;