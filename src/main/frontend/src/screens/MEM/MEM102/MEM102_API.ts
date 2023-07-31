import axios, {AxiosResponse} from "axios";
import {IAPIResponse} from "@custom-interfaces/common-interface";
import {IParam_SelectMEM102, IResult_SelectMEM102} from "@custom-interfaces/MEM102/mem102.interface";

export const selectCCTV = (param?: IParam_SelectMEM102):
    Promise<AxiosResponse<IAPIResponse<IResult_SelectMEM102>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "mem102.selectCCTV",
        ...(param || {})
    });
}