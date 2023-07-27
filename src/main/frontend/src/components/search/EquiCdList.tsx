import {useRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../atoms/searchAtom";
import {useQuery} from "react-query";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import axios from "axios";
import LoadingBox from "../loading/LoadingBox";
import SearchRS from "../searchRS/SearchRS";
import React from "react";

const EquiCdList = ({isLong = false}: { isLong?: boolean }) => {
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);

    const resultQuery_selectEquiCdForSearch = useQuery(
        [EQueryKey.SEARCH_EQUICD],
        () =>
            axios.post('/api/common/selectList', {
                queryId: 'common.selectEquiCdForSearch'
            }),
        {
            onSuccess: (data) => {
            }
        }
    );

    return (
        <>
            {resultQuery_selectEquiCdForSearch.status !== 'success' ? (
                <LoadingBox isLong={isLong}/>
            ) : (
                <SearchRS
                    placeholder={'장비코드'}
                    option={resultQuery_selectEquiCdForSearch.data?.data.Content}
                    value={rcSearch.equiCd}
                    defaultValue={rcSearch.equiCd}
                    handleChange={(data: any) => setRcSearch((prev) => ({...prev, equiCd: data}))}
                    isClearable={true}
                    required={false}
                    isLong={isLong}
                />
            )}
        </>
    )
}

export default EquiCdList;