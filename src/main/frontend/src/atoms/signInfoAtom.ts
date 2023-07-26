import {atom} from 'recoil';
import {IFirst, ISignInfo} from '@custom-interfaces/signInfo-interface';
import localStorageEffect from './localStorageEffect';

export const signInfoAtom = atom<ISignInfo>({
  key: 'signInfo',
  default: {
    isLogin: false,
    isSilentSignIn: false,
  },
  effects: [localStorageEffect('signInfo')],
});


export const firstAtom = atom<IFirst>({
  key: 'first',
  default: {
    isFirst: true,
  },
});