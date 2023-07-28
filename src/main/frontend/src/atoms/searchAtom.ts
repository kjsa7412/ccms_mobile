import {atom} from 'recoil';
import {ISearch} from "@custom-interfaces/search-interface";

export const searchAtom = atom<ISearch>({
    key: 'search',
    default: {
        yyyy: {
            value: new Date().getFullYear().toString(),
            label: new Date().getFullYear() + '년',
        },
        mm: {
            value: ('0' + (new Date().getMonth() + 1)).slice(-2),
            label: ('' + (new Date().getMonth() + 1)).slice(-2) + '월',
        },
        cctvName: null,
        cctvCode: null,
        cctvAddr: null,
        cctvTSGB: null,
        equiCd: null,
        equiNm: null,
        equiAddr: null
    }
});
