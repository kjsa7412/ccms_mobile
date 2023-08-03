package com.sjinc.ccmsmobile.project.common;

import com.sjinc.ccmsmobile.framework.data.ResultVo;
import com.sjinc.ccmsmobile.framework.utils.FrameConstants;
import com.sjinc.ccmsmobile.framework.utils.FrameFileUtil;
import com.sjinc.ccmsmobile.project.entity.User;
import com.sjinc.ccmsmobile.project.utils.UserUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.net.URLEncoder;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class CommonController {
    private final Logger LOGGER = LoggerFactory.getLogger(CommonController.class);
    private CommonService commonService;
    private UserUtil userUtil;
    ServletContext servletContext;

    public CommonController(CommonService commonService, UserUtil userUtil, ServletContext servletContext) {
        this.commonService = commonService;
        this.userUtil = userUtil;
        this.servletContext = servletContext;
    }

    /**
     * 공통 목록 조회 API
     *
     * @param request  HTTP 요청 객체
     * @param postData 요청 데이터 (HashMap<String, Object> 형식)
     * @return 결과 데이터 (ResultVo 객체)
     * @throws Exception 예외 발생 시
     */
    @PostMapping(value = "/common/selectList")
    public ResultVo selectList(HttpServletRequest request, @RequestBody HashMap<String, Object> postData) throws Exception {
        LOGGER.debug("[/api/common/selectList] postData : {}", postData);
        ResultVo resultVO = new ResultVo();

        try {
            User user = userUtil.getUserInfo(request);
            userUtil.addUserInfo(postData, user);
            resultVO.Content = commonService.selectList(postData);

            if (ObjectUtils.isEmpty(resultVO.Content)) {
                resultVO.IsWarning = true;
                resultVO.WarningMsg = "자료가 없습니다.";
            }
        } catch (Exception ex) {
            LOGGER.error("[/api/common/selectList] exception : {}", ex.getMessage());
            resultVO.IsError = true;
            resultVO.ErrorMsg = ex.getMessage();
        }

        LOGGER.debug("[/api/common/selectList] result : {}", resultVO);
        Thread.sleep(500);
        return resultVO;
    }

    @PostMapping(value = "/common/merge")
    public ResultVo merge(HttpServletRequest request, @RequestBody HashMap<String, Object> postData) throws Exception {
        LOGGER.debug("[/api/common/merge] postData : {}", postData);
        ResultVo resultVO = new ResultVo();
        resultVO.Content = 0;

        try {
            User user = userUtil.getUserInfo(request);
            userUtil.addUserInfo(postData, user);
            resultVO.Content = commonService.merge(postData);

            if ((int) resultVO.Content == 0) {
                resultVO.IsWarning = true;
                resultVO.WarningMsg = "반영되지 않았습니다.";
            }
        } catch (Exception ex) {
            LOGGER.error("[/api/common/merge] exception : {}", ex.getMessage());
            resultVO.IsError = true;
            resultVO.ErrorMsg = ex.getMessage();
        }

        LOGGER.debug("[/api/common/merge] result : {}", resultVO);
        Thread.sleep(500);
        return resultVO;
    }

    @PostMapping(value = "/common/mergeList")
    public ResultVo mergeList(HttpServletRequest request, @RequestBody HashMap<String, Object> postData) throws Exception {
        LOGGER.debug("[/api/common/merge] postData : {}", postData);
        ResultVo resultVO = new ResultVo();
        resultVO.Content = 0;

        try {
            User user = userUtil.getUserInfo(request);
            resultVO.Content = commonService.mergeList(postData, user);

            if ((int) resultVO.Content == 0) {
                resultVO.IsWarning = true;
                resultVO.WarningMsg = "반영되지 않았습니다.";
            }
        } catch (Exception ex) {
            LOGGER.error("[/api/common/merge] exception : {}", ex.getMessage());
            resultVO.IsError = true;
            resultVO.ErrorMsg = ex.getMessage();
        }

        LOGGER.debug("[/api/common/merge] result : {}", resultVO);
        Thread.sleep(500);
        return resultVO;
    }

    @PostMapping(value = "/common/delete")
    public ResultVo delete(HttpServletRequest request, @RequestBody HashMap<String, Object> postData) throws Exception {
        LOGGER.debug("[/api/common/delete] postData : {}", postData);
        ResultVo resultVO = new ResultVo();
        resultVO.Content = 0;

        try {
            User user = userUtil.getUserInfo(request);
            userUtil.addUserInfo(postData, user);
            resultVO.Content = commonService.delete(postData);

            if ((int) resultVO.Content == 0) {
                resultVO.IsWarning = true;
                resultVO.WarningMsg = "반영되지 않았습니다.";
            }
        } catch (Exception ex) {
            LOGGER.error("[/api/common/delete] exception : {}", ex.getMessage());
            resultVO.IsError = true;
            resultVO.ErrorMsg = ex.getMessage();
        }

        LOGGER.debug("[/api/common/delete] result : {}", resultVO);
        Thread.sleep(500);
        return resultVO;
    }

    @PostMapping(value = "/common/deleteList")
    public ResultVo deleteList(HttpServletRequest request, @RequestBody HashMap<String, Object> postData) throws Exception {
        LOGGER.debug("[/api/common/deleteList] postData : {}", postData);
        ResultVo resultVO = new ResultVo();
        resultVO.Content = 0;

        try {
            User user = userUtil.getUserInfo(request);
            resultVO.Content = commonService.deleteList(postData, user);

            if ((int) resultVO.Content == 0) {
                resultVO.IsWarning = true;
                resultVO.WarningMsg = "반영되지 않았습니다.";
            }
        } catch (Exception ex) {
            LOGGER.error("[/api/common/deleteList] exception : {}", ex.getMessage());
            resultVO.IsError = true;
            resultVO.ErrorMsg = ex.getMessage();
        }

        LOGGER.debug("[/api/common/deleteList] result : {}", resultVO);
        Thread.sleep(500);
        return resultVO;
    }

    @RequestMapping(value = "/common/downloadFile", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity downloadFile(HttpServletRequest httpServletRequest) throws Exception {

        try {
            Resource resource = FrameFileUtil.loadAsResource(
                    FrameConstants.REAL_PATH + // todo : 백오피스 IP를 path로 잡아야함
                            httpServletRequest.getParameter("servPath"),
                    httpServletRequest.getParameter("servFileNm"));

            String originFileName = URLEncoder.encode(httpServletRequest.getParameter("origFileNm"),
                    "UTF-8").replaceAll("\\+", "%20");
            HttpHeaders headers = new HttpHeaders();

            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(originFileName).build());

            return ResponseEntity.ok().headers(headers).body(resource);
        } catch (FileNotFoundException fe) {
            LOGGER.error("[/api/common/downloadFile] exception : {}", fe.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            LOGGER.error("[/api/common/downloadFile] exception : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }
}
