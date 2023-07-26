import './LoadingPost.css';

const LoadingPost = ({pHeight = 50}: { pHeight?: number }) => {
    return (
        <div className={"loadingPost-baseContainer"} style={{height: pHeight}}></div>
    )
};

export default LoadingPost;