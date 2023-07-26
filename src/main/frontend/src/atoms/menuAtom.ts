import {atom} from 'recoil';
import {IMenu} from "@custom-interfaces/menu-interface";

export const menuAtom = atom<IMenu>({
  key: 'menu',
  default: {
    isMenuOpened: false,
    xPosition: -window.innerWidth,
    parentMenu: null,
    childMenu: null,
    immediately: false,
  },
});
