import {atom} from 'recoil';
import {IMTS102} from "@custom-interfaces/MTS102/mts102-interface";

export const mts102Atom = atom<IMTS102>({
    key: 'mts102',
    default: {
        id: ""
    },
});
