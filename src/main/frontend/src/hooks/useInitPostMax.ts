import {useEffect} from "react";
import {ISearch} from "@custom-interfaces/search-interface";

const useInitPostMax = (setPostMax: Function, rcSearch: ISearch) => {
    useEffect(() => {
        setPostMax(20);
        return () => {
            // Cleanup 로직 (옵셔널)
        };
    }, [rcSearch.yyyy, rcSearch.mm, rcSearch.cctvAddr, rcSearch.cctvTSGB, rcSearch.cctvName, rcSearch.cctvCode]);
};

export default useInitPostMax;
