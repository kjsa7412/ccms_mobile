package com.sjinc.ccmsmobile.project.auth;

import com.sjinc.ccmsmobile.project.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
@Mapper
public interface AuthMapper {
    User selectUser(HashMap<String, Object> postData) throws Exception;

    String selectRefreshToken(HashMap<String, Object> postData) throws Exception;

    int updateRefreshToken(HashMap<String, Object> postData) throws Exception;

    int deleteRefreshToken(HashMap<String, Object> postData) throws Exception;
}
