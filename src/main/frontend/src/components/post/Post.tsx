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
                <>
                    {
                        value.title === 'MainTitle' ?
                            <div key={index + "MainTitle"} className={"post-MainTitle"}>
                                {value.contents}
                            </div> :
                            <div key={index} className={"post-itemContainer"}>
                                <div
                                    className={"post-title"}>
                                    {value.title}
                                </div>
                                <div
                                    className={"post-contents"}>
                                    {value.contents}
                                </div>
                            </div>
                    }
                </>
            ))}
        </Link>
    );
};

export default Post;