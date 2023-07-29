import {atom} from 'recoil';
import {IModalMutation} from "@custom-interfaces/modal-interface";
import {EModalMutationStatus} from "@custom-enums/common-enum";

export const modalMutationAtom = atom<IModalMutation>({
    key: 'modalMutation',
    default: {
        modalMutationStatus: EModalMutationStatus.Close,
        resultMutation: null,
        message: ""
    },
});
