export interface IAPIResponse<T> {
    IsError: boolean;
    IsSessionError: boolean;
    IsWarning: boolean;
    ErrorMsg: string;
    WarningMsg: string;
    Content: [T];
}

export interface IPostData {
    title: string;
    contents: string;
}

export interface IParam_SelectAtfi {
    atfi_id: string;
}

export interface IResult_SelectAtfi {
    comp_cd: string;
    atfi_id: string;
    atfi_seq: string;
    reg_pgm_id: string;
    serv_path: string;
    serv_file_nm: string;
    orig_file_nm: string;
    file_exte: string;
    file_size: string;
    dele_yn: string;
}