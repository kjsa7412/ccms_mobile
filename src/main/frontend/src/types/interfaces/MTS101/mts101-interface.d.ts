export interface IMTS101 {
    id: string;
    atfi_id: string;
}

export interface IParam_SelectMTS101 {
    yyyy: string;
    mm: string | null;
}

export interface IResult_SelectMTS101 {
    trou_mngr_dd_no: string;
    trou_gb_cotr_cd: string;
    trou_gb_cotr_nm: string;
    trou_dd_hrti: string;
    trou_cont: string;
    equi_cd: string;
    equi_nm: string;
    atfi_id: string;
}