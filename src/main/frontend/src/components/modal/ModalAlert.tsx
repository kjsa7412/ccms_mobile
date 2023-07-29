import './ModalAlert.css';
import {useRecoilState, useResetRecoilState} from "recoil";
import {modalAlertAtom} from "../../atoms/modalAlertAtom";
import {IModalAlert} from "@custom-interfaces/modal-interface";

const ModalAlert = () => {
    const [rcModalAlert] = useRecoilState<IModalAlert>(modalAlertAtom);
    const resetRcModalAlert = useResetRecoilState(modalAlertAtom);

    return (
        <>
            {rcModalAlert.isOpen &&
                <div className={"modalAlert-overlay"}>
                    <div className={"modalAlert-modal"}>
                        <div className={"modalAlert-textContainer"}>
                            <p>{rcModalAlert.message}</p>
                        </div>
                        <div className={"modalAlert-ok"} onClick={resetRcModalAlert}>
                            확인
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default ModalAlert;