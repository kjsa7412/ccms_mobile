import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState, useResetRecoilState} from "recoil";
import {IUser} from "@custom-interfaces/user-interface";
import {userAtom} from "../../../atoms/userAtom";
import {signInfoAtom} from "../../../atoms/signInfoAtom";
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "../../../atoms/menuAtom";
import {EMenuBar} from "@custom-enums/menu-enum";
import './MCM101.css';
import {theme1} from "../../../styles/theme";
import {useQuery} from "react-query";
import {signOut} from "./MCM101_API";
import axios from "axios";
import {EIcon} from "@custom-enums/common-enum";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import Icons from "../../../components/Icons";

const MCM101 = () => {
    const navigate = useNavigate();
    const resetUser = useResetRecoilState(userAtom);
    const resetSignInfo = useResetRecoilState(signInfoAtom);
    const [rcUser,] = useRecoilState<IUser>(userAtom);
    const [rcMenu, setRcMenu] = useRecoilState<IMenu>(menuAtom);
    const [menuIdx, setMenuIdx] = useState(
        new Map([[EMenuBar.PARENT_MENU.MTS.id, EMenuBar.PARENT_MENU.MTS.id]]),
    );

    const resultQuery_signOut = useQuery(
        [EQueryKey.MCM101_signOut],
        () => signOut(rcUser.userId),
        {
            enabled: false
        });

    const closeMenuBar = () => {
        if (rcMenu.isMenuOpened === true) {
            setRcMenu((prev) => ({
                ...prev,
                immediately: false,
                isMenuOpened: false,
                xPosition: -window.innerWidth - 5,
            }));
        } else {
            setRcMenu((prev) => ({
                ...prev,
                immediately: false,
                isMenuOpened: true,
                xPosition: 0,
            }));
        }
    };

    const selectParentMenu = (key: string) => {
        if (menuIdx.has(key)) {
            setMenuIdx((prev) => {
                const newState = new Map(prev);
                newState.delete(key);
                return newState;
            });
        } else {
            setMenuIdx((prev) => new Map([...prev, [key, key]]));
        }
    };

    const selectChildMenu = (key: string) => {
        setRcMenu((prev) => ({
            ...prev,
            parentMenu: EMenuBar.PARENT_MENU[key.substr(0, 2)],
            childMenu: EMenuBar.CHILD_MENU[key],
        }));

        closeMenuBar();
    };

    const onSignOut = () => {
        resultQuery_signOut.refetch();

        resetUser();
        resetSignInfo();

        delete axios.defaults.headers.common['X-AUTH-TOKEN'];

        closeMenuBar();
        setMenuIdx(new Map([[EMenuBar.PARENT_MENU.MTS.id, EMenuBar.PARENT_MENU.MTS.id]]));

        navigate('/');
    };

    const menuRendering = () => {
        const result = [];
        for (const [key, value] of Object.entries(EMenuBar.PARENT_MENU)) {
            result.push(
                <div className={"mcm101-itemContainer"} key={key}>
                    <div className={"mcm101-itemContainer-p"}
                         key={key}
                         onClick={() => {
                             selectParentMenu(key);
                         }}
                    >
                        {menuIdx.has(key) && <div className={"mcm101-selectedMenu"}/>}
                        <div className={"mcm101-iconContainer"}>
                            <Icons iconType={value.icon} fill={menuIdx.has(key) ? theme1.color.mainColor : "white"}
                                   width={"20"} height={"20"}/>
                        </div>
                        <div className={`mcm101-menuNameContainer-p ${menuIdx.has(key) ? "selected" : "unSelected"}`}>
                            {value.name}
                        </div>
                        <div className={"mcm101-iconContainer"}>
                            {menuIdx.has(key) ? (
                                <Icons iconType={EIcon.ArrowUp} fill={"white"} width={"18"} height={"18"}/>
                            ) : (
                                <Icons iconType={EIcon.ArrowDown} fill={"white"} width={"18"} height={"18"}/>
                            )}
                        </div>
                    </div>
                    {value.cMenu.map((cMenuValue) => (
                        <Link className={`mcm101-itemContainer-c ${menuIdx.has(key) ? "selected" : "unSelected"}`}
                              key={EMenuBar.CHILD_MENU[cMenuValue].id}
                              onClick={() => {
                                  selectChildMenu(EMenuBar.CHILD_MENU[cMenuValue].id);
                              }}
                              to={EMenuBar.CHILD_MENU[cMenuValue].link}
                        >
                            <div className={"mcm101-subMunuLine"}/>
                            <div
                                className={`mcm101-menuNameContainer-c ${rcMenu.childMenu?.id === EMenuBar.CHILD_MENU[cMenuValue].id ? "selected" : "unSelected"}`}
                            >
                                {EMenuBar.CHILD_MENU[cMenuValue].name}
                            </div>
                        </Link>
                    ))}
                </div>,
            );
        }
        return result;
    };

    return (
        <div className={`mcm101-baseContainer ${rcMenu.immediately ? "immediately" : "lazy"}`}
             style={{transform: `translateX(${rcMenu.xPosition}px)`}}>
            <div className={"mcm101-headerContainer"}>
                <div className={"mcm101-close"} onClick={closeMenuBar}>
                    <Icons iconType={EIcon.Close} fill={"white"} width={"20"} height={"20"}/>
                </div>
            </div>
            <div className={"mcm101-menuContainer-top"}>
                <span>{!!rcUser?.userNm && rcUser.userNm + '님 반갑습니다.'}</span>
            </div>
            <div className={"mcm101-lineContainer"}>
                <div className={"mcm101-line"}/>
            </div>
            <div className={"mcm101-menuContainer-body"}>
                {menuRendering()}
            </div>
            <div className={"mcm101-lineContainer"}>
                <div className={"mcm101-line"}/>
            </div>
            <div className={"mcm101-menuContainer-bottom"}>
                <div className={"mcm101-signOutContainer"}>
                    <div className={"mcm101-iconContainer"}>
                        <Icons iconType={EIcon.SignOut} fill={"white"} width={"18"} height={"18"}/>
                    </div>
                    <div className={"mcm101-signOutContents"} onClick={onSignOut}>
                        Sign Out
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MCM101;

