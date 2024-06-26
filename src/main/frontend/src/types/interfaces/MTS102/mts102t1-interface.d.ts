import {ISearchData} from "@custom-interfaces/search-interface";

interface IParam_SelectMTS102T1 {
    id: string;
}

interface IResult_SelectMTS102T1 {
    comp_cd: string;
    trou_mngr_dd_no: string;
    trou_gb_cotr_cd: string;
    trou_gb_cotr_nm: string;
    equi_cd: string;
    equi_nm: string;
    p_equi_cd: string;
    trou_dd_hrti: string;
    weth_cd: string;
    weth_nm: string;
    coer_id: string;
    coer_nm: string;
    coer_dept_cd: string;
    coer_dept_nm: string;
    trou_cont: string;
    atfi_id: string;
    trou_acto_stts_cd: string;
    trou_acto_stts_nm: string;
    trou_gb_acto_cd: string;
    trou_gb_acto_nm: string;
    trou_acto_meth_cd: string;
    trou_acto_meth_nm: string;
    trou_acto_dd: string;
    trou_acto_hrti: string;
    trou_actr_nm: string;
    trou_actr_dept_cd: string;
    trou_acto_cont: string;
    maint_id: string;
    maint_nm: string;
    remark: string;
    recall_dt: string;
}

interface IParam_UpdateTROU {
    id: string;
    trou_acto_stts_cd: string;
    trou_gb_acto_cd: ISearchData | null;
    trou_acto_meth_cd: ISearchData | null;
    trou_acto_dd: Date;
    trou_actr_nm: string;
    trou_acto_cont: string;
    recall_dt: Date | null;
}

interface IParam_DeleteTROU {
    id: string;
    equi_cd: string;
}