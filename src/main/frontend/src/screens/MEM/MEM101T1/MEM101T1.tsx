import React from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderClose, HeaderMenu, HeaderTitle} from "../../../components/header/HeaderItems";
import {useRecoilState} from "recoil";
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "../../../atoms/menuAtom";

const MEM101T1 = () => {
  const [rcMenu, setRcMenu] = useRecoilState<IMenu>(menuAtom);
  return (
    <ScreenContainer>
      <PageTitle title={'MEM101T1'}/>
      <HeaderBase left={[<HeaderClose closePath={!!rcMenu.childMenu?.link ? rcMenu.childMenu.link : '/'}/>]}
                  center={[<HeaderTitle title={'장비정보'}/>]}/>
    </ScreenContainer>
  )
}

export default MEM101T1;

