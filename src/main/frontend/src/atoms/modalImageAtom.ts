import {atom} from 'recoil';
import {IModalAlert, IModalImage} from "@custom-interfaces/modal-interface";

export const modalImageAtom = atom<IModalImage>({
    key: 'modalImage',
    default: {
        isOpen: false,
        src: ""
    },
});
