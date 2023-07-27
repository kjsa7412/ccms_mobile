import {useRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../atoms/searchAtom";
import {useQuery} from "react-query";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import axios from "axios";
import LoadingBox from "../loading/LoadingBox";
import SearchRS from "../searchRS/SearchRS";
import React from "react";

const EquiNmList = ({isLong = false}: { isLong?: boolean }) => {
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);

    const resultQuery_selectEquiNmForSearch = useQuery(
        [EQueryKey.SEARCH_EQUINM],
        () =>
            axios.post('/api/common/selectList', {
                queryId: 'common.selectEquiNmForSearch'
            }),
        {
            onSuccess: (data) => {
            }
        }
    );

    return (
        <>
            {resultQuery_selectEquiNmForSearch.status !== 'success' ? (
                <LoadingBox isLong={isLong}/>
            ) : (
                <SearchRS
                    placeholder={'장비명'}
                    option={resultQuery_selectEquiNmForSearch.data?.data.Content}
                    value={rcSearch.equiNm}
                    defaultValue={rcSearch.equiNm}
                    handleChange={(data: any) => setRcSearch((prev) => ({...prev, equiNm: data}))}
                    isClearable={true}
                    required={false}
                    isLong={isLong}
                />
            )}
        </>
    )
}

export default EquiNmList;