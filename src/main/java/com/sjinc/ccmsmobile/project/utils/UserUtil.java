package com.sjinc.ccmsmobile.project.utils;

import com.sjinc.ccmsmobile.framework.security.JwtTokenProvider;
import com.sjinc.ccmsmobile.project.auth.AuthDao;
import com.sjinc.ccmsmobile.project.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Component
public class UserUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserUtil.class);
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthDao authDao;

    @Autowired
    public UserUtil(JwtTokenProvider jwtTokenProvider, AuthDao authDao) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authDao = authDao;
    }

    public User getUserInfo(HttpServletRequest request) throws Exception {
        String token = jwtTokenProvider.resolveToken(request);
        String userId = jwtTokenProvider.getUserIdFromAccessToken(token);

        HashMap<String, Object> postData = new HashMap<>();
        postData.put("userId", userId);

        return authDao.selectUser(postData);
    }

    public void addUserInfo(HashMap map, User user) {
        map.put("compCd", user.getCompCd());
        map.put("loginId", user.getUserId());
        map.put("loginNm", user.getUserNm());
    }
}
