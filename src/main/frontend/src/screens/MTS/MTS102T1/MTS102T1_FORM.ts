import {parseDateStringToDate} from "../../../utils/HandleDateFormat";

export const initData = {
    trou_acto_stts_cd: 'ESDON',                 // 장애조치상태 (ER020)
    trou_gb_acto_cd: {value: '', label: ''},    // 장애구분(ER010)
    trou_acto_meth_cd: {value: '', label: ''},  // 처리방법(ER030)
    trou_acto_dd: new Date(),                   // 조치일자
    trou_acto_hrti: '',                         //조치시각
    trou_actr_nm: '',                           // 처리자
    trou_acto_cont: '',                         // 처리내용
}

export const loadData = (methods: any, inputData: any) => {
    !!inputData?.trou_acto_stts_cd &&
    methods.setValue("trou_acto_stts_cd", inputData.trou_acto_stts_cd);

    !!inputData?.trou_gb_acto_cd && !!inputData?.trou_gb_acto_nm &&
    methods.setValue("trou_gb_acto_cd", {
        value: inputData.trou_gb_acto_cd,
        label: inputData.trou_gb_acto_nm
    });

    !!inputData?.trou_acto_meth_cd && !!inputData?.trou_acto_meth_nm &&
    methods.setValue("trou_acto_meth_cd", {
        value: inputData.trou_acto_meth_cd,
        label: inputData.trou_acto_meth_nm
    });

    !!inputData?.trou_acto_dd && !!inputData?.trou_acto_hrti &&
    methods.setValue("trou_acto_dd", parseDateStringToDate(inputData.trou_acto_dd + inputData.trou_acto_hrti));

    !!inputData?.trou_actr_nm &&
    methods.setValue("trou_actr_nm", inputData.trou_actr_nm);

    !!inputData?.trou_acto_cont &&
    methods.setValue("trou_acto_cont", inputData.trou_acto_cont);
}