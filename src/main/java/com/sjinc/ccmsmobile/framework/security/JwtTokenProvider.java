package com.sjinc.ccmsmobile.framework.security;

import com.sjinc.ccmsmobile.project.auth.AuthDao;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * JWT 토큰을 생성하고 유효성을 검증하는 컴포넌트 클래스입니다.
 */
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);

    private final AuthDao authDao;
    @Value("${springboot.jwt.secret}")
    private String secretKey = "secretKey";

    @Value("${springboot.jwt.refreshSecretKey}")
    private String refreshSecretKey = "refreshSecretKey";

    /**
     * Access Token 유효 시간 (1시간)
     */
    private final long accessTokenValidMillisecond = 1000L * 60 * 60;

    /**
     * Refresh Token 유효 시간 (60시간)
     */
    private final long refreshTokenValidMillisecond = 1000L * 60 * 60 * 60;

    /**
     * 초기화 메서드입니다. Base64 인코딩을 수행하여 비밀 키를 초기화합니다.
     */
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        refreshSecretKey = Base64.getEncoder().encodeToString(refreshSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 사용자 ID와 역할 목록을 기반으로 Access Token을 생성합니다.
     *
     * @param userId 사용자 ID
     * @param roles  사용자 역할 목록
     * @return 생성된 Access Token
     */
    public String createAccessToken(String userId, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("roles", roles);
        Date now = new Date();

        String accessToken = Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + accessTokenValidMillisecond)) // 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 암호화 알고리즘 및 비밀 키 설정
                .compact();

        return accessToken;
    }

    /**
     * 사용자 ID와 역할 목록을 기반으로 Refresh Token을 생성합니다.
     *
     * @param userId 사용자 ID
     * @param roles  사용자 역할 목록
     * @return 생성된 Refresh Token
     */
    public String createRefreshToken(String userId, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("roles", roles);
        Date now = new Date();

        String refreshToken = Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + refreshTokenValidMillisecond)) // 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, refreshSecretKey)  // 암호화 알고리즘 및 비밀 키 설정
                .compact();

        return refreshToken;
    }

    /**
     * 주어진 토큰으로부터 사용자 인증 정보를 추출하여 Authentication 객체를 반환합니다.
     *
     * @param token 토큰
     * @return Authentication 객체
     * @throws Exception 예외 발생 시
     */
    public Authentication getAuthentication(String token) throws Exception {
        HashMap<String, Object> postData = new HashMap<>();
        postData.put("userId", this.getUserIdFromAccessToken(token));
        UserDetails userDetails = authDao.selectUser(postData); // 사용자 정보 조회 로직 추가
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    /**
     * Access Token으로부터 사용자 ID를 추출합니다.
     *
     * @param token Access Token
     * @return 사용자 ID
     */
    public String getUserIdFromAccessToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Refresh Token으로부터 사용자 ID를 추출합니다.
     *
     * @param token Refresh Token
     * @return 사용자 ID
     */
    public String getUserIdFromRefreshToken(String token) {
        return Jwts.parser().setSigningKey(refreshSecretKey).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * HTTP 요청에서 토큰을 추출합니다.
     *
     * @param request HTTP 요청
     * @return 추출된 토큰
     */
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    /**
     * 주어진 토큰의 유효성을 검사합니다.
     *
     * @param token 토큰
     * @return 유효성 검사 결과 (유효한 토큰인 경우 true, 그렇지 않은 경우 false)
     */
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            LOGGER.debug("[validateToken] 예외발생: {}", e.getMessage());
        }

        return false;
    }

    /**
     * 주어진 Refresh Token의 유효성을 검사하고, 유효한 경우 새로운 Access Token과 Refresh Token을 생성하여 반환합니다.
     *
     * @param token Refresh Token
     * @return 생성된 Access Token과 Refresh Token을 담은 HashMap 객체 (유효하지 않은 토큰인 경우 null)
     */
    public HashMap<String, String> validateRefreshToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(refreshSecretKey).parseClaimsJws(token);
            Date expiration = claims.getBody().getExpiration();

            if (expiration.after(new Date())) {
                String userId = claims.getBody().getSubject();
                List<String> roles = claims.getBody().get("roles", List.class);

                HashMap<String, String> result = new HashMap<>();
                result.put("accessToken", createAccessToken(userId, roles));
                result.put("refreshToken", createRefreshToken(userId, roles));

                return result;
            }
        } catch (Exception e) {
            LOGGER.debug("[validateToken] 예외발생: {}", e.getMessage());
        }

        return null;
    }
}