import './AttachFile.css';
import {useRecoilState} from "recoil";
import UploadFile from "./UploadFile";
import {getYYYYMMDDHMS} from "../../utils/HandleDateFormat";
import {attachFileAtom} from "../../atoms/attachFileAtom";
import {IAttachFile} from "@custom-interfaces/attachFile-interface";
import SavedFile from "./SavedFile";
import {EIcon} from "@custom-enums/common-enum";
import Icons from "../Icons";
import LoadingPost from "../loading/LoadingPost";
import React from "react";

const AttachFile = () => {
    const [rcAttachFile, setRcAttachFile] = useRecoilState<IAttachFile>(attachFileAtom);

    const handleChangeFile = (event: any) => {
        if (!!event.target.files?.length) {
            for (let i = 0; i < event.target.files.length; i++) {
                if (event.target.files[i]) {
                    let reader = new FileReader();
                    // 1. 파일을 읽어 버퍼에 저장
                    reader.readAsDataURL(event.target.files[i]);

                    // 2. 파일 상태 업데이트
                    reader.onloadend = () => {
                        const base64 = reader.result;

                        if (base64) {
                            const newFile = {
                                imgFile: event.target.files[i],
                                imgBase64: base64.toString(),
                            };

                            setRcAttachFile((prev) => ({
                                ...prev,
                                attachFile: [...prev.attachFile, newFile],
                            }));
                        }
                    };
                }
            }
        }
    };

    return (
        <div className={"attachFile-baseContainer"}>
            <label className={"attachFile-LabelContainer"} htmlFor={"file"}>
                <Icons iconType={EIcon.Picture} fill={"#E4007E"} width={"35"} height={"35"}/>
                <span>터치하여 사진을 선택하세요.</span>
            </label>
            <input
                type="file"
                id={"file"}
                onChange={handleChangeFile}
                multiple={true}
                style={{
                    position: "absolute" as "absolute",
                    overflow: "hidden",
                    width: 0,
                    height: 0,
                    padding: 0,
                    border: 0 }}
            />
            <div className={"attachFile-title"}>
                <span>선택된 파일</span>
            </div>
            {
                rcAttachFile.attachFile.map((item, index) => (
                    <UploadFile
                        key={index}
                        image={item.imgBase64}
                        name={item.imgFile.name}
                        desc={
                            !!item.imgFile.lastModifiedDate
                                ? 'Created : ' + getYYYYMMDDHMS(item.imgFile.lastModifiedDate)
                                : 'Created : ' + getYYYYMMDDHMS(new Date())
                        }
                        deleteFunction={() => {
                            setRcAttachFile((prev) => ({
                                ...prev,
                                attachFile: prev.attachFile.filter((_, idx) => index !== idx),
                            }));
                        }}
                    />
                ))
            }
            {
                !!rcAttachFile?.useSavedFile &&
                <>
                    <div className={"attachFile-title"}>
                        <span>저장된 파일</span>
                    </div>
                    {
                        !!rcAttachFile?.isLoadingSavedFile ?
                            <LoadingPost pHeight={50}/> :
                            rcAttachFile?.savedFile?.map(
                                (item, index) => (
                                    <SavedFile savedFile={item}/>
                                ))
                    }
                </>
            }
        </div>
    )
}

export default AttachFile;