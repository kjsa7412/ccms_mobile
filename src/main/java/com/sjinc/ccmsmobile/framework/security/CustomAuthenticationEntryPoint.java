package com.sjinc.ccmsmobile.framework.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 인증 실패 시 처리를 담당하는 클래스입니다.
 */
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final Logger LOGGER = LoggerFactory.getLogger(CustomAuthenticationEntryPoint.class);

    /**
     * 인증 실패 시 결과를 처리합니다.
     *
     * @param request   HTTP 요청 객체
     * @param response  HTTP 응답 객체
     * @param ex        발생한 인증 예외
     * @throws IOException 입출력 예외가 발생할 경우
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException ex) throws IOException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().write(objectMapper.writeValueAsString("인증이 실패하였습니다."));
        } catch (IOException e) {
            LOGGER.error("[commence] 예외 발생: {}", e.getMessage());
            throw e;
        }
    }
}
