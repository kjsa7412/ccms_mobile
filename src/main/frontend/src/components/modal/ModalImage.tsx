import './ModalImage.css';
import {useRecoilState, useResetRecoilState} from "recoil";
import {IModalImage} from "@custom-interfaces/modal-interface";
import {modalImageAtom} from "../../atoms/modalImageAtom";

const ModalImage = () => {
    const [rcModalImage] = useRecoilState<IModalImage>(modalImageAtom);
    const resetRcModalImage = useResetRecoilState(modalImageAtom);

    return (
        <>
            {rcModalImage.isOpen &&
                <div className={"modalImage-overlay"} onClick={resetRcModalImage}>
                    <img className={"modalImage-modal"} src={rcModalImage.src}/>
                </div>
            }
        </>
    )
}

export default ModalImage;