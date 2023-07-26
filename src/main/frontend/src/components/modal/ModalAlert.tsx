import ReactModal from 'react-modal';
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
        <ReactModal isOpen={modalIsOpen}
                    ariaHideApp={false}
                    style={{
                        overlay: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'rgba(0, 0, 0, 0.2)',
                            zIndex: 3,
                        },
                        content: {
                            position: 'static',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'white',
                            overflow: 'auto',
                            borderRadius: '10px',
                            outline: 'none',
                            borderStyle: 'none',
                            borderColor: 'darkgray',
                            width: '250px',
                            height: '200px'
                        }
                    }}>
            <div className={"modalAlert-textContainer"}>
                <p>{message}</p>
            </div>
            <div className={"modalAlert-ok"} onClick={CloseModal}>
                확인
            </div>
        </ReactModal>
    )
}

export default modalAlert;