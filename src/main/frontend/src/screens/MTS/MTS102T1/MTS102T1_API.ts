import axios, {AxiosResponse} from "axios";
import {
    IAPIResponse,
    IParam_SelectAtfi,
    IResult_SelectAtfi,
    IParam_SelectTROUAtfi,
    IResult_SelectTROUAtfi
} from "@custom-interfaces/common-interface";
import {
    IParam_DeleteTROU,
    IParam_SelectMTS102T1,
    IParam_UpdateTROU,
    IResult_SelectMTS102T1
} from "@custom-interfaces/MTS102/mts102t1-interface";
import {getHHMMSS, getYYYYMMDD} from "../../../utils/HandleDateFormat";
import {ISearchData} from "@custom-interfaces/search-interface";

export const selectMTS102T1 = (param: IParam_SelectMTS102T1):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectMTS102T1>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "mts102t1.selectMTS102t1",
        ...param
    });
};

export const selectAtfi = (param: IParam_SelectAtfi):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectAtfi>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "common.selectAtfi",
        ...param
    });
};

export const selectTROUAtfi = (param: IParam_SelectTROUAtfi):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectTROUAtfi>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "mts102t1.selectTORUAtfi",
        ...param
    });
};

export const updateTROU = (param: any):
    Promise<AxiosResponse<IAPIResponse<number>>> => {
    return axios.post("/api/mts102t1/updateTROU", param);
};

export const deleteTROU = (param: IParam_DeleteTROU):
    Promise<AxiosResponse<IAPIResponse<number>>> => {
    return axios.post("/api/common/merge", {
        queryId: "mts102t1.deleteTROU",
        ...param
    });
};

export const selectTSGBForSearch = ():
    Promise<AxiosResponse<IAPIResponse<ISearchData>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "common.selectTSGBForSearch"
    });
};

export const selectTSMETHForSearch = ():
    Promise<AxiosResponse<IAPIResponse<ISearchData>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "common.selectTSMETHForSearch"
    });
};
