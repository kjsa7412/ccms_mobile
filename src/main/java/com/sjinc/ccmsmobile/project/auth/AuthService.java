package com.sjinc.ccmsmobile.project.auth;

import com.sjinc.ccmsmobile.framework.security.JwtTokenProvider;
import com.sjinc.ccmsmobile.framework.security.RC4PasswordEncoder;
import com.sjinc.ccmsmobile.project.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * 인증 관련 기능을 제공하는 서비스 클래스입니다.
 */
@Service
public class AuthService {
    private final Logger LOGGER = LoggerFactory.getLogger(AuthService.class);

    private final AuthDao authDao;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * AuthService 인스턴스를 생성합니다.
     *
     * @param authDao          AuthDao 인스턴스
     * @param jwtTokenProvider JwtTokenProvider 인스턴스
     */
    @Autowired
    public AuthService(AuthDao authDao, JwtTokenProvider jwtTokenProvider) {
        this.authDao = authDao;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * 사용자 로그인을 처리합니다.
     *
     * @param postData 로그인에 필요한 데이터를 포함하는 HashMap
     * @return 로그인된 사용자 정보(User 객체)
     * @throws Exception 데이터 액세스 작업 중 발생한 예외
     */
    public User signIn(HashMap<String, Object> postData) throws Exception {
        User user = authDao.selectUser(postData);

        if (user == null) {
            throw new Exception("사용자를 찾을 수 없습니다.");
        }

        RC4PasswordEncoder passwordEncoder = new RC4PasswordEncoder();

        if (passwordEncoder.matches(String.valueOf(postData.get("pwd")), user.getPassword())) {
            user.setAccessToken(jwtTokenProvider.createAccessToken(String.valueOf(user.getUserId()), user.getRoles()));
            user.setRefreshToken(jwtTokenProvider.createRefreshToken(String.valueOf(user.getUserId()), user.getRoles()));

            postData.put("refreshToken", user.getRefreshToken());
            authDao.updateRefreshToken(postData);
        } else {
            throw new Exception("비밀번호가 맞지 않습니다.");
        }

        return user;
    }

    /**
     * 사용자 로그아웃을 처리합니다.
     *
     * @param postData 로그아웃에 필요한 데이터를 포함하는 HashMap
     * @return 로그아웃 결과를 나타내는 정수 값
     * @throws Exception 데이터 액세스 작업 중 발생한 예외
     */
    public int signOut(HashMap<String, Object> postData) throws Exception {
        return authDao.deleteRefreshToken(postData);
    }

    /**
     * 리프레시 토큰을 사용하여 사용자를 자동으로 로그인합니다.
     *
     * @param rRefreshToken 리프레시 토큰
     * @return 자동 로그인 결과를 포함하는 HashMap
     * @throws Exception 데이터 액세스 작업 중 발생한 예외
     */
    public HashMap<String, String> silentSignIn(String rRefreshToken) throws Exception {
        HashMap<String, String> result = new HashMap<>();

        String userId = jwtTokenProvider.getUserIdFromRefreshToken(rRefreshToken);
        HashMap<String, Object> parm = new HashMap<>();
        parm.put("userId", userId);
        String uRefreshToken = authDao.selectRefreshToken(parm);

        if (uRefreshToken.equals(rRefreshToken)) {
            result = jwtTokenProvider.validateRefreshToken(rRefreshToken);

            if (result != null) {
                parm.put("refreshToken", result.get("refreshToken"));
                authDao.updateRefreshToken(parm);
            }
        } else {
            throw new Exception("RefreshToken이 유효하지 않습니다.");
        }

        return result;
    }
}
