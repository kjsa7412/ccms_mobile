import {atom} from 'recoil';
import {IMTS102} from "@custom-interfaces/MTS102/mts102-interface";
import localStorageEffect from "../localStorageEffect";

export const mts102Atom = atom<IMTS102>({
    key: 'mts102',
    default: {
        id: "",
        atfi_id: ""
    },
    effects: [localStorageEffect('mts102')],
});
