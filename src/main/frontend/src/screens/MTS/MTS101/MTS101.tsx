import React, {useEffect, useState} from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderMenu, HeaderTitle} from "../../../components/header/HeaderItems";
import PageTitle from "../../../components/PageTitle";
import BaseContainer from "../../../components/containers/BaseContainer";
import ScreenLabel from "../../../components/label/ScreenLabel";
import SearchContainer from "../../../components/containers/SearchContainer";
import YYYYList from "../../../components/search/YYYYList";
import MMList from "../../../components/search/MMList";
import {useRecoilState, useResetRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../../atoms/searchAtom";
import {useQuery, useQueryClient} from 'react-query';
import {selectMTS101} from "./MTS101_API";
import {IMTS101, IResult_SelectMTS101} from "@custom-interfaces/MTS101/mts101-interface";
import {mts101Atom} from "../../../atoms/MTS101/mts101Atom";
import {EMenuBar} from "@custom-enums/menu-enum";
import useMenuStatus from "../../../hooks/useMenuStatus";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import LoadingBox from "../../../components/loading/LoadingBox";
import SearchRS from "../../../components/searchRS/SearchRS";
import TSGBList from "../../../components/search/TSGBList";
import MTS101_POST from "./MTS101_POST";
import useInitPostMax from "../../../hooks/useInitPostMax";
import {EQueryKey} from "@custom-enums/queryKey_enum";

const MTS101 = () => {
    // data
    const queryClient = useQueryClient();
    const [postMax, setPostMax] = useState(20);
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);
    const [, setRcMTS101] = useRecoilState<IMTS101>(mts101Atom);
    const resetRcMTS101 = useResetRecoilState(mts101Atom);
    const resetRcSearch = useResetRecoilState(searchAtom);

    // query
    const resultQuery_selectMTS101 = useQuery(
        [EQueryKey.MTS101_selectMTS101],
        () => selectMTS101({yyyy: rcSearch.yyyy.value, mm: rcSearch.mm.value}),
        {enabled: false},
    );

    // effect
    useEffect(() => {
        resultQuery_selectMTS101.refetch();

        setRcSearch((prev) => ({...prev, cctvName: null, cctvTSGB: null}));
        resetRcMTS101();

        return () => {
            queryClient.cancelQueries(EQueryKey.MTS101_selectMTS101);
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
    useMenuStatus(EMenuBar.PARENT_MENU.MTS, EMenuBar.CHILD_MENU.MTS101);

    return (
        <ScreenContainer>
            <PageTitle title={'MTS101'}/>
            <HeaderBase left={[<HeaderMenu/>]} center={[<HeaderTitle title={'장애처리대상'}/>]}/>
            <BaseContainer>
                <ScreenLabel title={'검색조건'}/>
                <SearchContainer>
                    <YYYYList/>
                    <MMList/>
                </SearchContainer>
                <SearchContainer>
                    {resultQuery_selectMTS101.status !== 'success' ||
                    resultQuery_selectMTS101.isFetching === true ? (
                        <LoadingBox isLong={true}/>
                    ) : (
                        <SearchRS
                            placeholder={'CCTV'}
                            option={resultQuery_selectMTS101.data?.data?.Content?.map(
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
                <MTS101_POST selectQuery={resultQuery_selectMTS101} postMax={postMax}/>
            </BaseContainer>
        </ScreenContainer>
    );
};

export default MTS101;

