import axios, {AxiosResponse} from "axios";
import {IAPIResponse} from "@custom-interfaces/common-interface";
import {IParam_SelectMEM101T1, IResult_SelectMEM101T1} from "@custom-interfaces/MEM101/mem101t1-interface";

export const selectMEM101T1 = (param: IParam_SelectMEM101T1):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectMEM101T1>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "mem101t1.selectMEM101T1",
        ...param
    });
};