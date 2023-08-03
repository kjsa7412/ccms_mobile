import axios, {AxiosResponse} from "axios";
import {IAPIResponse} from "@custom-interfaces/common-interface";
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

export const updateTROU = (param: IParam_UpdateTROU):
    Promise<AxiosResponse<IAPIResponse<number>>> => {
    return axios.post("/api/common/merge", {
        queryId: "mts102t1.updateTROU",
        id: param.id,
        trou_acto_stts_cd: param.trou_acto_stts_cd,
        trou_gb_acto_cd: param.trou_gb_acto_cd?.value,
        trou_acto_meth_cd: param.trou_acto_meth_cd?.value,
        trou_acto_dd: getYYYYMMDD(param.trou_acto_dd),
        trou_acto_hrti: getHHMMSS(param.trou_acto_dd),
        trou_actr_nm: param.trou_actr_nm,
        trou_acto_cont: param.trou_acto_cont,
        recall_dt: !!param.recall_dt ? getYYYYMMDD(param.recall_dt) : ""
    });
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
