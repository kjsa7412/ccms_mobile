import {atom} from 'recoil';
import {IMTS101} from "@custom-interfaces/MTS101/mts101-interface";

export const mts101Atom = atom<IMTS101>({
    key: 'mts101',
    default: {
        id: ""
    },
});
