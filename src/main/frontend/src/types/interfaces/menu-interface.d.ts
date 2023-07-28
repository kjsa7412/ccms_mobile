export interface IMenu {
    isMenuOpened: boolean;
    xPosition: number;
    parentMenu: IPMenu_detail | null;
    childMenu: ICMenu_detail | null;
    immediately: boolean;
}

export interface IMenuBar {
    PARENT_MENU: Record<string, IPMenu_detail>;
    CHILD_MENU: Record<string, ICMenu_detail>;
}

export interface IMenu_detail {
    id: string;
    name: string;
}

export interface IMenuWithIcon extends IMenu_detail {
    icon: any;
}

export interface IPMenu_detail extends IMenuWithIcon {
    cMenu: string[];
}

export interface ICMenu_detail extends IMenu_detail {
    link: string;
}

//

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