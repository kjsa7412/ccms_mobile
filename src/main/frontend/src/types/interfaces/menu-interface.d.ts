export interface IMenu {
    isMenuOpened: boolean;
    xPosition: number;
    parentMenu: IPMenu_detail | undefined | null;
    childMenu: ICMenu_detail | undefined | null;
    immediately: boolean;
}

export interface IMenuBar {
    PARENT_MENU: IPMenu;
    CHILD_MENU: ICMenu;
}

export interface IPMenu {
    [key: string]: IPMenu_detail;

    MTS: IPMenu_detail;
    MEM: IPMenu_detail;
}

export interface ICMenu {
    [key: string]: ICMenu_detail;

    MTS101: ICMenu_detail;
    MTS102: ICMenu_detail;
    MEM101: ICMenu_detail;
    MEM102: ICMenu_detail;
}

export interface IPMenu_detail {
    id: string;
    name: string;
    icon: any;
    cMenu: string[];
}

export interface ICMenu_detail {
    id: string;
    name: string;
    link: string;
}
