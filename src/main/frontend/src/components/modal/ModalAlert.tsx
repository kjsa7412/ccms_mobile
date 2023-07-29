import './ModalAlert.css';

type Props = {
    modalIsOpen: boolean;
    funcCloseModal: Function;
    message: string;
}

const modalAlert = ({modalIsOpen, funcCloseModal, message}: Props) => {
    const CloseModal = () => {
        funcCloseModal(false);
    };

    return (
        <>
            {modalIsOpen &&
                <div className={"modalAlert-overlay"}>
                    <div className={"modalAlert-modal"}>
                        <div className={"modalAlert-textContainer"}>
                            <p>{message}</p>
                        </div>
                        <div className={"modalAlert-ok"} onClick={CloseModal}>
                            확인
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default modalAlert;