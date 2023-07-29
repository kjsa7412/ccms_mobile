import './ModalMutation.css';
import {EModalMutationStatus} from "@custom-enums/common-enum";

type Props = {
    modalMutationStatus: string;
    setModalMutationStatus: Function;
    resultMutation: any;
    successFunction: Function;
}

const modalMutation = ({
                           modalMutationStatus,
                           setModalMutationStatus,
                           resultMutation,
                           successFunction
                       }: Props) => {
    return (
        <>
            {
                modalMutationStatus !== EModalMutationStatus.Close &&
                <div className={"modalAlert-overlay"}>
                    <div className={"modalAlert-modal"}>
                        {modalMutationStatus === EModalMutationStatus.Confirm && (
                            <>
                                <div className={"modalMutation-textContainer"}>
                                    <p>진행하시겠습니까?</p>
                                </div>
                                <div className={"modalMutation-button"}
                                     onClick={() => {
                                         setModalMutationStatus(EModalMutationStatus.Progress);
                                         resultMutation.mutate();
                                     }}
                                >
                                    확인
                                </div>
                                <div className={"modalMutation-button"}
                                     onClick={() => {
                                         setModalMutationStatus(EModalMutationStatus.Close);
                                     }}
                                >
                                    취소
                                </div>
                            </>
                        )}

                        {modalMutationStatus === EModalMutationStatus.Progress && (
                            <>
                                <div className={"modalMutation-textContainer"}>
                                    <p>처리중입니다.</p>
                                </div>
                                <div className={"modalMutation-button"}>
                                    <img alt={'spinner'} src={`${process.env.PUBLIC_URL}/img/Spinner-1s-38px.gif`}/>
                                </div>
                            </>
                        )}

                        {modalMutationStatus === EModalMutationStatus.Success && (
                            <>
                                <div className={"modalMutation-textContainer"}>
                                    <p>처리되었습니다.</p>
                                </div>
                                <div className={"modalMutation-button"}
                                     onClick={() => {
                                         resultMutation.reset();
                                         setModalMutationStatus(EModalMutationStatus.Close);
                                         successFunction();
                                     }}
                                >
                                    확인
                                </div>
                            </>
                        )}

                        {modalMutationStatus === EModalMutationStatus.Error && (
                            <>
                                <div className={"modalMutation-textContainer"}>
                                    <p>실패했습니다.</p>
                                </div>
                                <div className={"modalMutation-button"}
                                     color={'red'}
                                     onClick={() => {
                                         resultMutation.reset();
                                         setModalMutationStatus(EModalMutationStatus.Close);
                                     }}
                                >
                                    확인
                                </div>
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default modalMutation;