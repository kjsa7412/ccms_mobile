import './ModalMutation.css';
import {EModalMutationStatus} from "@custom-enums/common-enum";
import {useRecoilState} from "recoil";
import {IModalMutation} from "@custom-interfaces/modal-interface";
import {modalMutationAtom} from "../../atoms/modalMutationAtom";
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "../../atoms/menuAtom";
import {useNavigate} from "react-router-dom";

const ModalMutation = () => {
    const navigate = useNavigate();
    const [rcMenu,] = useRecoilState<IMenu>(menuAtom);
    const [rcModalMutation, setRcModalMutation] = useRecoilState<IModalMutation>(modalMutationAtom);

    const successFunction = () => {
        !!rcMenu.childMenu?.link ? navigate(rcMenu.childMenu.link) : navigate('/');
    }

    return (
        <>
            {
                rcModalMutation.modalMutationStatus !== EModalMutationStatus.Close &&
                <div className={"modalAlert-overlay"}>
                    <div className={"modalAlert-modal"}>
                        {rcModalMutation.modalMutationStatus === EModalMutationStatus.Confirm && (
                            <>
                                <div className={"modalMutation-textContainer"}>
                                    <p>{rcModalMutation.message + "하시겠습니까?"}</p>
                                </div>
                                <div className={"modalMutation-buttonContainer"}>
                                    <div className={"modalMutation-button line"}
                                         onClick={() => {
                                             setRcModalMutation((prev) => ({
                                                 ...prev,
                                                 modalMutationStatus: EModalMutationStatus.Progress
                                             }));
                                             rcModalMutation.resultMutation.mutate();
                                         }}
                                    >
                                        확인
                                    </div>
                                    <div className={"modalMutation-button"}
                                         onClick={() => {
                                             setRcModalMutation((prev) => ({
                                                 ...prev,
                                                 modalMutationStatus: EModalMutationStatus.Close
                                             }));
                                         }}
                                    >
                                        취소
                                    </div>
                                </div>
                            </>
                        )}

                        {rcModalMutation.modalMutationStatus === EModalMutationStatus.Progress && (
                            <>
                                <div className={"modalMutation-textContainer"}>
                                    <p>{rcModalMutation.message + "중입니다."}</p>
                                </div>
                                <div className={"modalMutation-buttonContainer"}>
                                    <div className={"modalMutation-button long"}>
                                        <img alt={'spinner'} src={`${process.env.PUBLIC_URL}/img/Spinner-1s-38px.gif`}/>
                                    </div>
                                </div>
                            </>
                        )}

                        {rcModalMutation.modalMutationStatus === EModalMutationStatus.Success && (
                            <>
                                <div className={"modalMutation-textContainer"}>
                                    <p>{rcModalMutation.message + "되었습니다."}</p>
                                </div>
                                <div className={"modalMutation-buttonContainer"}>
                                    <div className={"modalMutation-button long"}
                                         onClick={() => {
                                             setRcModalMutation((prev) => ({
                                                 ...prev,
                                                 modalMutationStatus: EModalMutationStatus.Close
                                             }));
                                             rcModalMutation.resultMutation.reset();
                                             successFunction();
                                         }}
                                    >
                                        확인
                                    </div>
                                </div>
                            </>
                        )}

                        {rcModalMutation.modalMutationStatus === EModalMutationStatus.Error && (
                            <>
                                <div className={"modalMutation-textContainer"}>
                                    <p>실패했습니다.</p>
                                </div>
                                <div className={"modalMutation-buttonContainer"}>
                                    <div className={"modalMutation-button long"}
                                         color={'red'}
                                         onClick={() => {
                                             setRcModalMutation((prev) => ({
                                                 ...prev,
                                                 modalMutationStatus: EModalMutationStatus.Close
                                             }));
                                             rcModalMutation.resultMutation.reset();
                                         }}
                                    >
                                        확인
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default ModalMutation;