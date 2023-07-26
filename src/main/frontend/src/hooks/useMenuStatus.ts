import {useRecoilState} from 'recoil';
import {ICMenu_detail, IMenu, IPMenu_detail} from '@custom-interfaces/menu-interface';
import {menuAtom} from "../atoms/menuAtom";
import {useEffect} from "react";

const useMenuStatus = (pMenu: IPMenu_detail, cMenu: ICMenu_detail) => {
    const [rcMenu, setRcMenu] = useRecoilState<IMenu>(menuAtom);

    useEffect(() => {
        if (!rcMenu.parentMenu?.id || pMenu.id !== rcMenu.parentMenu.id) {
            setRcMenu((prev) => ({
                ...prev,
                parentMenu: pMenu,
            }));
        }

        if (!rcMenu.childMenu?.id || cMenu.id !== rcMenu.childMenu.id) {
            setRcMenu((prev) => ({
                ...prev,
                childMenu: cMenu,
            }));
        }
        return () => {
        }
    }, [pMenu, cMenu])

    return null;
};

export default useMenuStatus;
