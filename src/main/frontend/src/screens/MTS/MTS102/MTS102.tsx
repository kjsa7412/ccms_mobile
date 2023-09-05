import React, {useEffect, useState} from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderMenu, HeaderTitle} from "../../../components/header/HeaderItems";
import {useQuery, useQueryClient} from "react-query";
import {useRecoilState, useResetRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../../atoms/searchAtom";
import {IMTS102} from "@custom-interfaces/MTS102/mts102-interface";
import {mts102Atom} from "../../../atoms/MTS102/mts102Atom";
import {selectMTS102} from "./MTS102_API";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import useInitPostMax from "../../../hooks/useInitPostMax";
import useMenuStatus from "../../../hooks/useMenuStatus";
import {EMenuBar} from "@custom-enums/menu-enum";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import BaseContainer from "../../../components/containers/BaseContainer";
import ScreenLabel from "../../../components/label/ScreenLabel";
import SearchContainer from "../../../components/containers/SearchContainer";
import YYYYList from "../../../components/search/YYYYList";
import MMList from "../../../components/search/MMList";
import LoadingBox from "../../../components/loading/LoadingBox";
import SearchRS from "../../../components/searchRS/SearchRS";
import {IResult_SelectMTS101} from "@custom-interfaces/MTS101/mts101-interface";
import TSGBList from "../../../components/search/TSGBList";
import MTS102_POST from "../MTS102/MTS102_POST";

const MTS102 = () => {
    // data
    const queryClient = useQueryClient();
    const [postMax, setPostMax] = useState(20);
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);
    const [, setRcMTS102] = useRecoilState<IMTS102>(mts102Atom);
    const resetRcSearch = useResetRecoilState(searchAtom);

    // query
    const resultQuery_selectMTS102 = useQuery(
        [EQueryKey.MTS102_selectMTS102],
        () => selectMTS102({yyyy: rcSearch.yyyy?.value, mm: rcSearch.mm?.value}),
        {enabled: false},
    );

    // effect
    useEffect(() => {
        resultQuery_selectMTS102.refetch();

        setRcSearch((prev) => ({...prev, cctvName: null, cctvTSGB: null}));
        setRcMTS102((prev) => ({...prev, id: ""}));

        return () => {
            queryClient.cancelQueries(EQueryKey.MTS102_selectMTS102);
        };
    }, [rcSearch.yyyy, rcSearch.mm]);

    useEffect(() => {
        resetRcSearch();
        return () => {
        };
    }, []);

    // custom hook
    useInfiniteScroll(setPostMax);
    useInitPostMax(setPostMax, rcSearch);
    useMenuStatus(EMenuBar.PARENT_MENU.MTS, EMenuBar.CHILD_MENU.MTS102);

    return (
        <ScreenContainer>
            <PageTitle title={'MTS102'}/>
            <HeaderBase left={[<HeaderMenu/>]} center={[<HeaderTitle title={'장애처리내역'}/>]}/>
            <BaseContainer>
                <ScreenLabel title={'검색조건'}/>
                <SearchContainer>
                    <YYYYList/>
                    <MMList/>
                </SearchContainer>
                <SearchContainer>
                    {resultQuery_selectMTS102.status !== 'success' ||
                    resultQuery_selectMTS102.isFetching === true ? (
                        <LoadingBox isLong={true}/>
                    ) : (
                        <SearchRS
                            placeholder={'CCTV'}
                            option={resultQuery_selectMTS102.data?.data?.Content?.map(
                                (value: IResult_SelectMTS101) => {
                                    return {
                                        label: value.equi_nm,
                                        value: value.equi_cd,
                                    };
                                })}
                            value={rcSearch.cctvName}
                            defaultValue={rcSearch.cctvName}
                            handleChange={(data: any) => {
                                setRcSearch((prev) => ({...prev, cctvName: data}))
                            }}
                            isLong={true}
                        />
                    )}
                </SearchContainer>
                <SearchContainer>
                    <TSGBList isLong={true}/>
                </SearchContainer>
                <MTS102_POST selectQuery={resultQuery_selectMTS102} postMax={postMax}/>
            </BaseContainer>
        </ScreenContainer>
    )
}

export default MTS102;

