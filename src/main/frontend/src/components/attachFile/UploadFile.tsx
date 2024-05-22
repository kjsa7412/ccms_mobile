import './UploadFile.css';
import {EIcon} from "@custom-enums/common-enum";
import Icons from "../Icons";
import {useRecoilState} from "recoil";
import {IModalImage} from "@custom-interfaces/modal-interface";
import {modalImageAtom} from "../../atoms/modalImageAtom";

interface UploadFile {
    image: string;
    name: string;
    desc: string;
    deleteFunction: any;
}

const UploadFile = (param : UploadFile) => {
    const [rcModalImage, setRcModalImage] = useRecoilState<IModalImage>(modalImageAtom);
    return (
        <div className={"uploadFile-FileContainer"}>
            <img className={"uploadFile-FileImage"} src={param.image}
                 onClick={() => {
                     setRcModalImage(
                         (prev) =>
                             ({isOpen: true, src: param.image}))
                 }}/>
            <div className={"uploadFile-FileContents"}>
                <div className={"uploadFile-FileName"}>{param.name}</div>
                <div className={"uploadFile-FileDesc"}>{param.desc}</div>
            </div>
            <div className={"uploadFile-DeleteButton"} onClick={param.deleteFunction}>
                <Icons iconType={EIcon.TrashCan} fill={"#E4007E"} width={"20"} height={"20"}/>
            </div>
        </div>
    )
}
export default UploadFile;