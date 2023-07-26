import React from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderMenu, HeaderTitle} from "../../../components/header/HeaderItems";

const MEM101 = () => {
  return (
    <ScreenContainer>
      <PageTitle title={'MEM101'}/>
      <HeaderBase left={[<HeaderMenu/>]} center={[<HeaderTitle title={'장비정보조회'}/>]}/>
    </ScreenContainer>
  );
};

export default MEM101;

