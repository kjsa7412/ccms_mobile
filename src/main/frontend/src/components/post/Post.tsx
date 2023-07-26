import {Link} from "react-router-dom";
import './Post.css';
import {IPostData} from "@custom-interfaces/common-interface";

interface Props {
    postData: IPostData[];
    link: string;
    onClick: any;
}

const Post = ({postData, link, onClick}: Props) => {
    return (
        <Link className={"post-baseContainer"} to={link} onClick={onClick}>
            {postData.map((value: IPostData, index) => (
                <div key={index} className={"post-bodyContainer"}>
                    <div className={`post-title ${index === 0 && "first"} ${index === postData.length - 1 && "last"}`}>
                        {value.title}
                    </div>
                    <div
                        className={`post-contents ${index === 0 && "first"} ${index === postData.length - 1 && "last"}`}>
                        {value.contents}
                    </div>
                </div>
            ))}
        </Link>
    );
};

export default Post;