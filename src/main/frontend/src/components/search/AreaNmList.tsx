import {useRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../atoms/searchAtom";
import {useQuery} from "react-query";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import axios from "axios";
import LoadingBox from "../loading/LoadingBox";
import SearchRS from "../searchRS/SearchRS";
import React from "react";

const AreaNmList = ({isLong = false}: { isLong?: boolean }) => {
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);

    const resultQuery_selectAreaNmForSearch = useQuery(
        [EQueryKey.SEARCH_AREANM],
        () =>
            axios.post('/api/common/selectList', {
                queryId: 'common.selectAreaNmForSearch'
            }),
        {
            onSuccess: (data) => {
            }
        }
    );

    return (
        <>
            {resultQuery_selectAreaNmForSearch.status !== 'success' ? (
                <LoadingBox isLong={isLong}/>
            ) : (
                <SearchRS
                    placeholder={'장비명'}
                    option={resultQuery_selectAreaNmForSearch.data?.data.Content}
                    value={rcSearch.areaNm}
                    defaultValue={rcSearch.areaNm}
                    handleChange={(data: any) => setRcSearch((prev) => ({...prev, areaNm: data}))}
                    isClearable={true}
                    required={false}
                    isLong={isLong}
                />
            )}
        </>
    )
}

export default AreaNmList;