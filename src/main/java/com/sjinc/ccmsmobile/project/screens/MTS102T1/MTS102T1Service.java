package com.sjinc.ccmsmobile.project.screens.MTS102T1;

import com.sjinc.ccmsmobile.framework.utils.FrameConstants;
import com.sjinc.ccmsmobile.framework.utils.FrameFileUtil;
import com.sjinc.ccmsmobile.project.auth.AuthService;
import com.sjinc.ccmsmobile.project.screens.MTS101T1.MTS101T1InsertTROURequestVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
public class MTS102T1Service {
    @Value("${ccms.attach.path}")
    private String attachPath;

    private final Logger LOGGER = LoggerFactory.getLogger(AuthService.class);

    private SqlSessionTemplate primarySqlSessionTemplate;

    @Autowired
    public MTS102T1Service(SqlSessionTemplate primarySqlSessionTemplate) {
        this.primarySqlSessionTemplate = primarySqlSessionTemplate;
    }

    public int updateTROU(MTS102T1UpdateTROURequestVo postData) {
        return primarySqlSessionTemplate.update("mts102t1.updateTROU", postData);
    }

    public int insertFile(MTS102T1UpdateTROURequestVo postData) throws Exception {
        int result = 0;

        for(MultipartFile file : postData.getFiles()) {
            if (!ObjectUtils.isEmpty(file) && file.getSize() > 0) {
                String dir = FrameFileUtil.makeDir(FrameConstants.REAL_PATH + File.separator + attachPath);
                Map<String, String> pathMapping = FrameFileUtil.makeFile(file, dir);

                HashMap<String, Object> atfiInfo = new HashMap<>();
                atfiInfo.put("compCd", postData.getCompCd());
                atfiInfo.put("trouId", postData.getId());
                atfiInfo.put("fileExte", pathMapping.get("orgExtension"));
                atfiInfo.put("fileSize", Long.valueOf(pathMapping.get("size")));
                atfiInfo.put("origFileNm", pathMapping.get("originalFilename"));
                atfiInfo.put("regUserId", postData.getLoginId());
                atfiInfo.put("servFileNm", pathMapping.get("srcFileName"));
                atfiInfo.put("servPath", dir.replace(FrameConstants.REAL_PATH, ""));

                result += primarySqlSessionTemplate.insert("mts102t1.insertFile", atfiInfo);
            }
        }

        return result;
    }

    public int deleteFile(MTS102T1UpdateTROURequestVo postData) throws Exception {
        int result = 0;

        for(String key : postData.getDeleteKey()) {
            HashMap<String, Object> atfiInfo = new HashMap<>();
            atfiInfo.put("compCd", postData.getCompCd());
            atfiInfo.put("trouId", postData.getId());
            atfiInfo.put("atfiSeq", Integer.valueOf(key).intValue());
            atfiInfo.put("updateUserId", postData.getLoginId());
            result += primarySqlSessionTemplate.insert("mts102t1.deleteFile", atfiInfo);
        }

        return result;
    }
}
