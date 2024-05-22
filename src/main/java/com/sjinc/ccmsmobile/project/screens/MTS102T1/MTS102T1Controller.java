package com.sjinc.ccmsmobile.project.screens.MTS102T1;

import com.sjinc.ccmsmobile.framework.data.ResultVo;
import com.sjinc.ccmsmobile.project.auth.AuthController;
import com.sjinc.ccmsmobile.project.entity.User;
import com.sjinc.ccmsmobile.project.screens.MTS101T1.MTS101T1InsertTROURequestVo;
import com.sjinc.ccmsmobile.project.utils.UserUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class MTS102T1Controller {
    private final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    private final MTS102T1Service mts102T1Service;
    private UserUtil userUtil;

    @Autowired
    public MTS102T1Controller(MTS102T1Service mts102T1Service, UserUtil userUtil) {
        this.mts102T1Service = mts102T1Service;
        this.userUtil = userUtil;
    }

    @PostMapping(value = "/mts102t1/updateTROU")
    public ResultVo updateTROU(HttpServletRequest request,
                               @RequestParam(value = "id", required = false) String id,
                               @RequestParam(value = "trou_acto_stts_cd", required = false) String trou_acto_stts_cd,
                               @RequestParam(value = "trou_gb_acto_cd", required = false) String trou_gb_acto_cd,
                               @RequestParam(value = "trou_acto_meth_cd", required = false) String trou_acto_meth_cd,
                               @RequestParam(value = "trou_acto_dd", required = false) String trou_acto_dd,
                               @RequestParam(value = "trou_acto_hrti", required = false) String trou_acto_hrti,
                               @RequestParam(value = "trou_actr_nm", required = false) String trou_actr_nm,
                               @RequestParam(value = "trou_acto_cont", required = false) String trou_acto_cont,
                               @RequestParam(value = "recall_dt", required = false) String recall_dt,
                               @RequestParam(value = "file", required = false) MultipartFile[] files,
                               @RequestParam(value = "deleteKey", required = false) String[] deleteKey) throws Exception {
        ResultVo resultVO = new ResultVo();
        resultVO.Content = 0;
        MTS102T1UpdateTROURequestVo postData = new MTS102T1UpdateTROURequestVo();

        try {
            User user = userUtil.getUserInfo(request);
            postData.setId(id);
            postData.setTrou_acto_stts_cd(trou_acto_stts_cd);
            postData.setTrou_gb_acto_cd(trou_gb_acto_cd);
            postData.setTrou_acto_meth_cd(trou_acto_meth_cd);
            postData.setTrou_acto_dd(trou_acto_dd);
            postData.setTrou_acto_hrti(trou_acto_hrti);
            postData.setTrou_actr_nm(trou_actr_nm);
            postData.setTrou_acto_cont(trou_acto_cont);
            postData.setRecall_dt(recall_dt);
            postData.setFiles(files);
            postData.setDeleteKey(deleteKey);
            postData.setCompCd(user.getCompCd());
            postData.setLoginId(user.getUserId());
            postData.setLoginNm(user.getUserNm());

            resultVO.Content = mts102T1Service.updateTROU(postData);

            if((int)resultVO.Content == 0) {
                resultVO.IsWarning = true;
                resultVO.WarningMsg = "반영되지 않았습니다.";
                resultVO.Content = 0;
            }

            if(postData.getFiles() != null) {
                if(mts102T1Service.insertFile(postData) == 0) {
                    resultVO.IsWarning = true;
                    resultVO.WarningMsg = "반영되지 않았습니다.";
                    resultVO.Content = 0;
                }
            }

            if(postData.getDeleteKey() != null) {
                if(mts102T1Service.deleteFile(postData) == 0) {
                    resultVO.IsWarning = true;
                    resultVO.WarningMsg = "반영되지 않았습니다.";
                    resultVO.Content = 0;
                }
            }
        } catch (Exception ex) {
            LOGGER.error("[/api/mts102t1/updateTROU] exception : {}", ex.getMessage());
            resultVO.IsError = true;
            resultVO.ErrorMsg = ex.getMessage();
        }

        LOGGER.debug("[/api/mts102t1/updateTROU] result : {}", resultVO);
        Thread.sleep(500);
        return resultVO;
    }
}
