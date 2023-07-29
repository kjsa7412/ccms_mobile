import React, {useEffect, useState} from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderMenu, HeaderTitle} from "../../../components/header/HeaderItems";
import {useQuery} from "react-query";
import {useRecoilState, useResetRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../../atoms/searchAtom";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import {selectMEM101} from "./MEM101_API";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useInitPostMax from "../../../hooks/useInitPostMax";
import useMenuStatus from "../../../hooks/useMenuStatus";
import {EMenuBar} from "@custom-enums/menu-enum";
import ScreenLabel from "../../../components/label/ScreenLabel";
import SearchContainer from "../../../components/containers/SearchContainer";
import EquiCdList from "../../../components/search/EquiCdList";
import BaseContainer from "../../../components/containers/BaseContainer";
import EquiNmList from "../../../components/search/EquiNmList";
import EquiAddrList from "../../../components/search/EquiAddrList";
import MEM101_POST from "./MEM101_POST";

const MEM101 = () => {
    // data
    const [postMax, setPostMax] = useState(20);
    const [rcSearch,] = useRecoilState<ISearch>(searchAtom);
    const resetRcSearch = useResetRecoilState(searchAtom);

    // query
    const resultQuery_selectMEM101 = useQuery(
        [EQueryKey.MEM101_selectMEM101],
        () => selectMEM101()
    )

    // effect
    useEffect(() => {
        resetRcSearch();
        return () => {
        };
    }, []);

    // custom hook
    useInfiniteScroll(setPostMax);
    useInitPostMax(setPostMax, rcSearch);
    useMenuStatus(EMenuBar.PARENT_MENU.MEM, EMenuBar.CHILD_MENU.MEM101);

    return (
        <ScreenContainer>
            <PageTitle title={'MEM101'}/>
            <HeaderBase left={[<HeaderMenu/>]} center={[<HeaderTitle title={'장비정보조회'}/>]}/>
            <BaseContainer>
                <ScreenLabel title={'검색조건'}/>
                <SearchContainer>
                    <EquiCdList isLong={true}/>
                </SearchContainer>
                <SearchContainer>
                    <EquiNmList isLong={true}/>
                </SearchContainer>
                <SearchContainer>
                    <EquiAddrList isLong={true}/>
                </SearchContainer>
                <MEM101_POST postMax={postMax} selectQuery={resultQuery_selectMEM101}/>
            </BaseContainer>
        </ScreenContainer>
    );
};

export default MEM101;

