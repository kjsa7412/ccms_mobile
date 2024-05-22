import axios, {AxiosResponse} from 'axios';
import {getHHMMSS, getYYYYMMDD} from "../../../utils/HandleDateFormat";
import {
    IParam_InsertTROU,
    IParam_SelectMTS101T1,
    IResult_SelectMTS101T1
} from "@custom-interfaces/MTS101/mts101t1-interface";
import {IAPIResponse, IParam_SelectAtfi, IResult_SelectAtfi} from "@custom-interfaces/common-interface";
import {ISearchData} from "@custom-interfaces/search-interface";

export const selectMTS101T1 = (param: IParam_SelectMTS101T1):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectMTS101T1>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "mts101t1.selectMTS101t1",
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

export const insertTROU = (param: any):
    Promise<AxiosResponse<IAPIResponse<number>>> => {
    return axios.post("/api/mts101t1/insertTROU", param);
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

