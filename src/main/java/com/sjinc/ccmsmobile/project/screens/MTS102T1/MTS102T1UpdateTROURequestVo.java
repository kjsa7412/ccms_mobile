package com.sjinc.ccmsmobile.project.screens.MTS102T1;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class MTS102T1UpdateTROURequestVo {
    private String id;
    private String trou_acto_stts_cd;
    private String trou_gb_acto_cd;
    private String trou_acto_meth_cd;
    private String trou_acto_dd;
    private String trou_acto_hrti;
    private String trou_actr_nm;
    private String trou_acto_cont;
    private String recall_dt;
    private MultipartFile[] files;
    private String[] deleteKey;
    private String compCd;
    private String loginId;
    private String loginNm;
}
