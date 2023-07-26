import {IMenuBar} from '@custom-interfaces/menu-interface';
import {EIcon} from "@custom-enums/common-enum";

export const EMenuBar: IMenuBar = {
    PARENT_MENU: {
        MTS: {id: 'MTS', name: '장애관리', icon: EIcon.MTS, cMenu: ['MTS101', 'MTS102']},
        MEM: {id: 'MEM', name: '장비관리', icon: EIcon.MEM, cMenu: ['MEM101', 'MEM102']},
    },
    CHILD_MENU: {
        MTS101: {id: 'MTS101', name: '장애처리대상', link: '/'},
        MTS102: {id: 'MTS102', name: '장애처리내역', link: '/MTS102'},
        MEM101: {id: 'MEM101', name: '장비정보조회', link: '/MEM101'},
        MEM102: {id: 'MEM102', name: 'GIS기반장비찾기', link: '/MEM102'},
    }
};
