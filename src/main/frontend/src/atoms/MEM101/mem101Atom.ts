import {atom} from 'recoil';
import {IMEM101} from "@custom-interfaces/MEM101/mem101-interface";

export const mem101Atom = atom<IMEM101>({
    key: 'mem101',
    default: {
        id: ""
    },
});
