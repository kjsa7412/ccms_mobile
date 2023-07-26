package com.sjinc.ccmsmobile.project.auth;

import com.sjinc.ccmsmobile.project.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import java.util.HashMap;
import java.util.Objects;

import static org.springframework.http.HttpHeaders.SET_COOKIE;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * 사용자 로그인 요청을 처리합니다.
     *
     * @param postData 사용자 로그인 데이터를 포함한 요청 본문.
     * @return 사용자 정보와 액세스 토큰이 포함된 ResponseEntity를 성공 시 반환하고, 실패 시 잘못된 요청으로 응답합니다.
     */
    @PostMapping(value = "/auth/signIn")
    public ResponseEntity<Objects> signIn(@RequestBody HashMap<String, Object> postData) {
        ResponseEntity responseEntity;

        try {
            User user = authService.signIn(postData);
            String refreshToken = user.getRefreshToken();
            String accessToken = user.getAccessToken();
            user.setPwd(null);
            user.setLoginToken(null);
            user.setRefreshToken(null);
            user.setAccessToken(null);

            ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                    .maxAge(7 * 24 * 60 * 60) // 최대 수명: 7일
                    .path("/") // 쿠키 경로: 모든 경로
                    .secure(true) // true: HTTPS를 통해서만 접근 가능 -- todo : SSL 인증서 처리 후 true 변경
                    .sameSite("None") // None: 모든 도메인에서 접근 가능
                    .httpOnly(true) // true: 클라이언트 측 JavaScript에서 접근 불가능
                    .build();

            responseEntity = ResponseEntity.ok()
                    .header(SET_COOKIE, cookie.toString())
                    .header("X-AUTH-TOKEN", accessToken) // X-AUTH-TOKEN 헤더 설정
                    .body(user);
        } catch (Exception ex) {
            LOGGER.error("로그인 실패: {}", ex.getMessage());
            responseEntity = ResponseEntity.badRequest().body(ex.getMessage());
        }

        return responseEntity;
    }

    /**
     * 사용자 로그아웃 요청을 처리합니다.
     *
     * @param postData 사용자 로그아웃 데이터를 포함한 요청 본문.
     * @return 성공 시 빈 ResponseEntity를 반환하고, 실패 시 잘못된 요청으로 응답합니다.
     * @throws Exception 예외가 발생한 경우 던집니다.
     */
    @PostMapping(value = "/auth/signOut")
    public ResponseEntity<Objects> signOut(@RequestBody HashMap<String, Object> postData) {
        ResponseEntity responseEntity;

        try {
            authService.signOut(postData);
            responseEntity = ResponseEntity.ok("");
        } catch (Exception ex) {
            LOGGER.error("로그아웃 실패: {}", ex.getMessage());
            responseEntity = ResponseEntity.badRequest().body(ex.getMessage());
        }

        return responseEntity;
    }

    /**
     * 사용자의 자동 로그인 요청을 처리합니다.
     *
     * @param cookie   요청 쿠키에서 "refreshToken"을 가져옵니다. (선택 사항)
     * @param postData "refreshToken"을 포함한 요청 본문.
     * @return 액세스 토큰이 포함된 ResponseEntity를 성공 시 반환하고, 실패 시 잘못된 요청으로 응답합니다.
     * @throws Exception 예외가 발생한 경우 던집니다.
     */
    @PostMapping(value = "/auth/silentSignIn")
    public ResponseEntity<Objects> silentSignIn(@CookieValue(value = "refreshToken", required = false) Cookie cookie,
                                                @RequestBody HashMap<String, Object> postData) {
        ResponseEntity responseEntity = ResponseEntity.badRequest().body("[/api/auth/silentSignIn] silentSignIn fail");

        String refreshTokenFromCookie = cookie != null ? cookie.getValue() : "";
        String refreshTokenFromStorage = postData.get("refreshToken") != null ? String.valueOf(postData.get("refreshToken")) : "";
        String usingRefreshToken = refreshTokenFromCookie != "" ? refreshTokenFromCookie : refreshTokenFromStorage;

        try {
            if (StringUtils.hasText(usingRefreshToken)) {
                HashMap<String, String> result = authService.silentSignIn(usingRefreshToken);

                String accessToken = result.getOrDefault("accessToken", "");
                String refreshToken = result.getOrDefault("refreshToken", "");

                if (StringUtils.hasText(accessToken) && StringUtils.hasText(refreshToken)) {
                    ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken)
                            .maxAge(7 * 24 * 60 * 60) // 최대 수명: 7일
                            .path("/") // 쿠키 경로: 모든 경로
                            .secure(true) // true: HTTPS를 통해서만 접근 가능 -- todo : SSL 인증서 처리 후 true 변경
                            .sameSite("None") // None: 모든 도메인에서 접근 가능
                            .httpOnly(true) // true: 클라이언트 측 JavaScript에서 접근 불가능
                            .build();

                    responseEntity = ResponseEntity.ok()
                            .header(SET_COOKIE, responseCookie.toString())
                            .header("X-AUTH-TOKEN", accessToken) // X-AUTH-TOKEN 헤더 설정
                            .body("");
                }
            }

            Thread.sleep(3000);
        } catch (Exception ex) {
            LOGGER.error("자동 로그인 실패: {}", ex.getMessage());
            responseEntity = ResponseEntity.badRequest().body(ex.getMessage());
        }

        return responseEntity;
    }
}
