import {IAPIResponse} from "@custom-interfaces/common-interface";
import {IParam_SelectMTS101, IResult_SelectMTS101} from "@custom-interfaces/MTS101/mts101-interface";
import axios, {AxiosResponse} from 'axios';

export const selectMTS101 = (param: IParam_SelectMTS101):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectMTS101>>> => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const promise = axios.post("/api/common/selectList", {
        queryId: "mts101.selectMTS101",
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
