import { atom } from 'recoil';
import { IUser } from '@custom-interfaces/user-interface';
import localStorageEffect from './localStorageEffect';

export const userAtom = atom<IUser>({
  key: 'user',
  default: {
    compCd: '',
    userId: '',
    userNm: '',
    beloCompNm: '',
    deptNm: '',
    posiNm: '',
    telNo: '',
    email: '',
    bigo: '',
  },
  effects: [localStorageEffect('user')],
});