import {atom} from 'recoil';
import {IAttachFile} from "@custom-interfaces/attachFile-interface";

export const attachFileAtom = atom<IAttachFile>({
    key: 'attachFile',
    default: {
        attachFile: [],
        deleteFile: [],
        savedFile: null,
        isLoadingSavedFile: true,
        useSavedFile: false
    },
});
