import React from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderMenu, HeaderTitle} from "../../../components/header/HeaderItems";

const MEM102 = () => {
  return (
    <ScreenContainer>
      <PageTitle title={'MEM102'}/>
      <HeaderBase left={[<HeaderMenu/>]} center={[<HeaderTitle title={'GIS기반장비찾기'}/>]}/>
    </ScreenContainer>
  );
};

export default MEM102;

