import './LoadingBox.css'

const LoadingBox = ({isLong = true, pHeight = 38}: { isLong?: boolean, pHeight?: number }) => {
    return (
        <div className={`loadingBox-baseContainer ${isLong && "isLong"}`}
             style={{height: pHeight}}>
            <div className={"loadingBox-baseContainer2"}/>
        </div>);
};

export default LoadingBox;