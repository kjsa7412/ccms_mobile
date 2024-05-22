import {IResult_SelectTROUAtfi} from "@custom-interfaces/common-interface";

export interface IAttachFile{
    attachFile: any[];
    deleteFile: any[];
    savedFile: IResult_SelectTROUAtfi[] | null;
    isLoadingSavedFile: boolean;
    useSavedFile: boolean;
}