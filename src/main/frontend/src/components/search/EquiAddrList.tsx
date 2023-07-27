import {useRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import {searchAtom} from "../../atoms/searchAtom";
import {useQuery} from "react-query";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import axios from "axios";
import LoadingBox from "../loading/LoadingBox";
import SearchRS from "../searchRS/SearchRS";
import React from "react";

const EquiAddrList = ({isLong = false}: { isLong?: boolean }) => {
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);

    const resultQuery_selectEquiAddrForSearch = useQuery(
        [EQueryKey.SEARCH_EQUIADDR],
        () =>
            axios.post('/api/common/selectList', {
                queryId: 'common.selectEquiAddrForSearch'
            }),
        {
            onSuccess: (data) => {
            }
        }
    );

    return (
        <>
            {resultQuery_selectEquiAddrForSearch.status !== 'success' ? (
                <LoadingBox isLong={isLong}/>
            ) : (
                <SearchRS
                    placeholder={'설치주소'}
                    option={resultQuery_selectEquiAddrForSearch.data?.data.Content}
                    value={rcSearch.equiAddr}
                    defaultValue={rcSearch.equiAddr}
                    handleChange={(data: any) => setRcSearch((prev) => ({...prev, equiAddr: data}))}
                    isClearable={true}
                    required={false}
                    isLong={isLong}
                />
            )}
        </>
    )
}

export default EquiAddrList;