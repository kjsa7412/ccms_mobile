import axios, {AxiosResponse} from "axios";
import {IAPIResponse} from "@custom-interfaces/common-interface";
import {IResult_SelectMEM101} from "@custom-interfaces/MEM101/mem101-interface";

export const selectMEM101 = ():
    Promise<AxiosResponse<IAPIResponse<IResult_SelectMEM101>>> => {
    return axios.post("/api/common/selectList", {
        queryId: "mem101.selectMEM101"
    });
}