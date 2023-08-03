import './ImageListRow.css';
import React from "react";
import {IResult_SelectAtfi} from "@custom-interfaces/common-interface";
import {useRecoilState} from "recoil";
import {IModalImage} from "@custom-interfaces/modal-interface";
import {modalImageAtom} from "../../atoms/modalImageAtom";

type Props = {
    atfi: IResult_SelectAtfi[]
}

const ImageListRow = ({atfi}: Props) => {
    const [rcModalImage, setRcModalImage] = useRecoilState<IModalImage>(modalImageAtom);

    return (
        <div className="imageListRow-baseContainer">
            {
                atfi.map((data, index) => {
                    let srcUrl = "/api/common/downloadFile?servFileNm=" + encodeURI(data.serv_file_nm) +
                        "&servPath=" + encodeURI(data.serv_path) +
                        "&origFileNm=" + encodeURI(data.orig_file_nm);
                    return (
                        <img key={index}
                             className={"imageListRow-imageBox"}
                             src={srcUrl}
                             onClick={() => {
                                 setRcModalImage(
                                     (prev) =>
                                         ({isOpen: true, src: srcUrl}))
                             }}
                        />
                    )
                })
            }
        </div>
    )
}

export default ImageListRow;