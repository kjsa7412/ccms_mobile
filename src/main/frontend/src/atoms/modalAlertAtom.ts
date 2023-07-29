import {atom} from 'recoil';
import {IModalAlert} from "@custom-interfaces/modal-interface";

export const modalAlertAtom = atom<IModalAlert>({
    key: 'modalAlert',
    default: {
        isOpen: false,
        message: ""
    },
});
