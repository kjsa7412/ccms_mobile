package com.sjinc.ccmsmobile.project.auth;

import com.sjinc.ccmsmobile.project.entity.User;
import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

/**
 * 인증과 관련된 데이터 액세스 작업을 처리하는 DAO 클래스입니다.
 */
@Component
@MapperScan
public class AuthDao {
    private final Logger LOGGER = LoggerFactory.getLogger(AuthDao.class);

    private final AuthMapper authMapper;

    /**
     * AuthMapper를 주입받는 생성자입니다.
     *
     * @param authMapper 인증 매퍼(AuthMapper) 인스턴스
     */
    @Autowired
    public AuthDao(AuthMapper authMapper) {
        this.authMapper = authMapper;
    }

    /**
     * 주어진 데이터를 기준으로 사용자 정보를 조회합니다.
     *
     * @param postData 조회에 사용될 데이터를 포함하는 HashMap
     * @return 조회된 사용자 정보(User 객체)
     * @throws Exception 데이터 액세스 작업 중 발생한 예외
     */
    public User selectUser(HashMap<String, Object> postData) throws Exception {
        User user = authMapper.selectUser(postData);

        if (user == null) {
            throw new Exception("사용자를 찾을 수 없습니다.");
        }

        user.setRoles(List.of("ROLE_ADMIN"));

        return user;
    }

    /**
     * 주어진 데이터를 기준으로 리프레시 토큰을 조회합니다.
     *
     * @param postData 조회에 사용될 데이터를 포함하는 HashMap
     * @return 조회된 리프레시 토큰
     * @throws Exception 데이터 액세스 작업 중 발생한 예외
     */
    public String selectRefreshToken(HashMap<String, Object> postData) throws Exception {
        return authMapper.selectRefreshToken(postData);
    }

    /**
     * 주어진 데이터를 기준으로 리프레시 토큰을 업데이트합니다.
     *
     * @param postData 업데이트에 사용될 데이터를 포함하는 HashMap
     * @return 업데이트된 행의 수
     * @throws Exception 데이터 액세스 작업 중 발생한 예외
     */
    public int updateRefreshToken(HashMap<String, Object> postData) throws Exception {
        return authMapper.updateRefreshToken(postData);
    }

    /**
     * 주어진 데이터를 기준으로 리프레시 토큰을 삭제합니다.
     *
     * @param postData 삭제에 사용될 데이터를 포함하는 HashMap
     * @return 삭제된 행의 수
     * @throws Exception 데이터 액세스 작업 중 발생한 예외
     */
    public int deleteRefreshToken(HashMap<String, Object> postData) throws Exception {
        return authMapper.deleteRefreshToken(postData);
    }
}
