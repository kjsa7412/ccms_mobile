import axios, {AxiosResponse} from 'axios';
import {getHHMMSS, getYYYYMMDD} from "../../../utils/HandleDateFormat";
import {
    IParam_InsertTROU,
    IParam_SelectMTS101T1,
    IResult_SelectMTS101T1
} from "@custom-interfaces/MTS101/mts101t1-interface";
import {IAPIResponse} from "@custom-interfaces/common-interface";
import {ISearchData} from "@custom-interfaces/search-interface";

export const selectMTS101T1 = (param: IParam_SelectMTS101T1):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectMTS101T1>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "mts101t1.selectMTS101t1",
        ...param
    });
};

export const insertTROU = (param: IParam_InsertTROU):
    Promise<AxiosResponse<IAPIResponse<number>>> => {
    return axios.post("/api/common/merge", {
        queryId: "mts101t1.insertTROU",
        id: param.id,
        trou_acto_stts_cd: param.trou_acto_stts_cd,
        trou_gb_acto_cd: param.trou_gb_acto_cd?.value,
        trou_acto_meth_cd: param.trou_acto_meth_cd?.value,
        trou_acto_dd: getYYYYMMDD(param.trou_acto_dd),
        trou_acto_hrti: getHHMMSS(param.trou_acto_dd),
        trou_actr_nm: param.trou_actr_nm,
        trou_acto_cont: param.trou_acto_cont
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

