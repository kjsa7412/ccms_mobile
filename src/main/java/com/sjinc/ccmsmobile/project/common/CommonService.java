package com.sjinc.ccmsmobile.project.common;

import com.sjinc.ccmsmobile.project.entity.User;
import com.sjinc.ccmsmobile.project.utils.UserUtil;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
public class CommonService {
    private final Logger LOGGER = LoggerFactory.getLogger(CommonService.class);
    private SqlSessionTemplate primarySqlSessionTemplate;
    private UserUtil userUtil;

    public CommonService(SqlSessionTemplate primarySqlSessionTemplate, UserUtil userUtil) {
        this.primarySqlSessionTemplate = primarySqlSessionTemplate;
        this.userUtil = userUtil;
    }

    @Transactional(readOnly = true)
    public List<HashMap<String, Object>> selectList(HashMap<String, Object> postData) {
        return primarySqlSessionTemplate.selectList(String.valueOf(postData.get("queryId")), postData);
    }

    public int merge(HashMap<String, Object> postData) {
        return primarySqlSessionTemplate.update(String.valueOf(postData.get("queryId")), postData);
    }

    public int mergeList(HashMap<String, Object> postData, User user) {
        int result = 0;
        List<HashMap<String, Object>> dataList = (List<HashMap<String, Object>>)postData.get("data");

        for (HashMap<String, Object> data : dataList) {
            userUtil.addUserInfo(data, user);
            result += primarySqlSessionTemplate.update(String.valueOf(postData.get("queryId")), postData);
        }

        return result;
    }

    public int delete(HashMap<String, Object> postData) {
        return primarySqlSessionTemplate.delete(String.valueOf(postData.get("queryId")), postData);
    }

    public int deleteList(HashMap<String, Object> postData, User user) {
        int result = 0;
        List<HashMap<String, Object>> dataList = (List<HashMap<String, Object>>)postData.get("data");

        for (HashMap<String, Object> data : dataList) {
            userUtil.addUserInfo(data, user);
            result += primarySqlSessionTemplate.delete(String.valueOf(postData.get("queryId")), postData);
        }

        return result;
    }
}
