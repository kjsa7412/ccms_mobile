import {useQuery} from 'react-query';
import axios from 'axios';
import LoadingBox from '../loading/LoadingBox';
import {searchAtom} from "../../atoms/searchAtom";
import {useRecoilState} from "recoil";
import {ISearch} from "@custom-interfaces/search-interface";
import SearchRS from "./SearchRS";
import {EQueryKey} from "@custom-enums/queryKey_enum";

const MMList = ({isLong = false}: { isLong?: boolean }) => {
    const [rcSearch, setRcSearch] = useRecoilState<ISearch>(searchAtom);

    const resultQuery_selectMMForSearch = useQuery(
        [EQueryKey.SEARCH_MM],
        () =>
            axios.post('/api/common/selectList', {
                queryId: 'common.selectMMForSearch',
            }),
        {
            onSuccess: (data) => {
            },
        },
    );

    return (
        <>
            {resultQuery_selectMMForSearch.status !== 'success' ? (
                <LoadingBox isLong={isLong}/>
            ) : (
                <SearchRS
                    placeholder={'월'}
                    option={resultQuery_selectMMForSearch.data?.data.Content}
                    value={rcSearch.mm}
                    defaultValue={rcSearch.mm}
                    handleChange={(data: any) => setRcSearch((prev) => ({...prev, mm: data}))}
                    isClearable={false}
                    required={true}
                    isLong={isLong}
                />
            )}
        </>
    );
};

export default MMList;
