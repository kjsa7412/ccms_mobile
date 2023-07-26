import {IAPIResponse} from "@custom-interfaces/common-interface";
import {IParam_SelectMTS102, IResult_SelectMTS102} from "@custom-interfaces/MTS102/mts102-interface";
import axios, {AxiosResponse} from 'axios';

export const selectMTS102 = (param: IParam_SelectMTS102):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectMTS102>>> => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const promise = axios.post("/api/common/selectList", {
        queryId: "mts102.selectMTS102",
        cancelToken: source.token,
        ...param
    });

    // @ts-ignore
    promise.cancel = () => {
        source.cancel("Query was cancelled by React Query");
        console.log("Query was cancelled by React Query");
    };

    return promise;
};
