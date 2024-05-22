import './SavedFile.css';
import {IResult_SelectTROUAtfi} from "@custom-interfaces/common-interface";
import {useRecoilState} from "recoil";
import {IAttachFile} from "@custom-interfaces/attachFile-interface";
import {attachFileAtom} from "../../atoms/attachFileAtom";
import {EIcon} from "@custom-enums/common-enum";
import Icons from "../Icons";
import {IModalImage} from "@custom-interfaces/modal-interface";
import {modalImageAtom} from "../../atoms/modalImageAtom";

interface ISavedFile {
    savedFile: IResult_SelectTROUAtfi
}

const SavedFile = (param: ISavedFile) => {
    const [rcModalImage, setRcModalImage] = useRecoilState<IModalImage>(modalImageAtom);
    const [rcAttachFile, resetRcAttachFile] = useRecoilState<IAttachFile>(attachFileAtom);

    let srcUrl = "/api/common/downloadFile?servFileNm=" + encodeURI(param.savedFile.serv_file_nm) +
        "&servPath=" + encodeURI(param.savedFile.serv_path) +
        "&origFileNm=" + encodeURI(param.savedFile.orig_file_nm);

    let trashCanColor;

    if (!!Array.from(rcAttachFile.deleteFile).includes(param.savedFile.atfi_seq)) {
        trashCanColor = '#E4007E';
    } else {
        trashCanColor = 'lightgray';
    }

    const setDeleteFile = (key: any) => {
        if (!!Array.from(rcAttachFile.deleteFile).includes(key)) {
            // key 있으면 삭제
            resetRcAttachFile((prev) => ({
                ...prev,
                deleteFile: rcAttachFile.deleteFile.filter((value) => value !== key)
            }));
        } else {
            // key 없으면 추가
            resetRcAttachFile((prev) => ({
                ...prev,
                deleteFile: [...prev.deleteFile, key]
            }));
        }
    };

    return (
        <div className={"savedfile-FileContainer"}>
            <img className={"savedfile-FileImage"} src={srcUrl}
                 onClick={() => {
                     setRcModalImage(
                         (prev) =>
                             ({isOpen: true, src: srcUrl}))
                 }}/>
            <div className={"savedfile-FileContents"}>
                <div className={"savedfile-FileName"}>{param.savedFile.orig_file_nm}</div>
                <div className={"savedfile-FileDesc"}>{'Created : ' + param.savedFile.reg_dt}</div>
            </div>
            <div className={"savedfile-DeleteButton"} onClick={() => setDeleteFile(param.savedFile.atfi_seq)}>
                <Icons iconType={EIcon.TrashCan} fill={trashCanColor} width={"20"} height={"20"}/>
            </div>
        </div>
    )
}
export default SavedFile;