import {useRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../atoms/searchAtom";
import {useQuery} from "react-query";
import axios from "axios";
import LoadingBox from "../loading/LoadingBox";
import React from "react";
import SearchRS from "./SearchRS";
import {EQueryKey} from "@custom-enums/queryKey_enum";

const TSGBList = ({isLong = false}: { isLong?: boolean }) => {
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);

    const resultQuery_selectTSGBForSearch = useQuery(
        [EQueryKey.SEARCH_TSGB],
        () =>
            axios.post('/api/common/selectList', {
                queryId: 'common.selectTSGBForSearch'
            }),
        {
            onSuccess: (data) => {
            }
        }
    );

    return (
        <>
            {resultQuery_selectTSGBForSearch.status !== 'success' ? (
                <LoadingBox isLong={isLong}/>
            ) : (
                <SearchRS
                    placeholder={'장애구분'}
                    option={resultQuery_selectTSGBForSearch.data?.data.Content}
                    value={rcSearch.cctvTSGB}
                    defaultValue={rcSearch.cctvTSGB}
                    handleChange={(data: any) => setRcSearch((prev) => ({...prev, cctvTSGB: data}))}
                    isClearable={true}
                    required={false}
                    isLong={isLong}
                />
            )}
        </>
    )
}

export default TSGBList;