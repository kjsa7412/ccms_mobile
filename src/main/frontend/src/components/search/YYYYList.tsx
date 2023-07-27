import {useRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../atoms/searchAtom";
import {useQuery} from "react-query";
import axios from "axios";
import LoadingBox from "../loading/LoadingBox";
import React from "react";
import SearchRS from "../searchRS/SearchRS";
import {EQueryKey} from "@custom-enums/queryKey_enum";

const YYYYList = ({isLong = false}: { isLong?: boolean }) => {
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);

    const resultQuery_selectYYYYForSearch = useQuery(
        [EQueryKey.SEARCH_YYYY],
        () =>
            axios.post('/api/common/selectList', {
                queryId: 'common.selectYYYYForSearch'
            }),
        {
            onSuccess: (data) => {
            }
        }
    );

    return (
        <>
            {resultQuery_selectYYYYForSearch.status !== 'success' ? (
                <LoadingBox isLong={isLong}/>
            ) : (
                <SearchRS
                    placeholder={'연도'}
                    option={resultQuery_selectYYYYForSearch.data?.data.Content}
                    value={rcSearch.yyyy}
                    defaultValue={rcSearch.yyyy}
                    handleChange={(data: any) => setRcSearch((prev) => ({...prev, yyyy: data}))}
                    isClearable={false}
                    required={true}
                    isLong={isLong}
                />
            )}
        </>
    )
}

export default YYYYList;