package com.sjinc.ccmsmobile.framework.config;

import com.sjinc.ccmsmobile.framework.security.CustomAccessDeniedHandler;
import com.sjinc.ccmsmobile.framework.security.CustomAuthenticationEntryPoint;
import com.sjinc.ccmsmobile.framework.security.JwtAuthenticationFilter;
import com.sjinc.ccmsmobile.framework.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security 설정 클래스입니다.
 */
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SecurityConfiguration(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * HTTP 요청에 대한 보안 설정을 구성합니다.
     *
     * @param http HttpSecurity 객체
     * @throws Exception 예외
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable() // CORS 설정과 CSRF 보호를 비활성화 (HTTP Basic 인증도 함께 자동으로 비활성)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 생성 정책 설정 (세션을 사용하지 않음)
                .and()
                .authorizeRequests() // 요청에 대한 인가 설정 시작
                .antMatchers("/api/auth/signIn", "/api/auth/silentSignIn", "/api/auth/signOut",
                        "/img/**", "/static/**", "/manifest.json", "/index.html", "/favicon.ico", "/asset-manifest.json").permitAll() // 특정 경로는 모두 허용
                .antMatchers(HttpMethod.GET, "/**").permitAll() // GET 요청은 모두 허용
                .antMatchers("**exception**").permitAll() // 특정 패턴의 경로는 모두 허용
                .anyRequest().hasRole("ADMIN") // 그 외의 요청은 ADMIN 역할을 가진 사용자만 허용
                .and()
                .exceptionHandling() // 예외 처리 설정 시작
                .accessDeniedHandler(new CustomAccessDeniedHandler()) // 접근 거부 예외 처리
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint()) // 인증 예외 처리
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class); // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 이전에 등록
    }

    /**
     * Spring Security가 무시할 요청을 구성합니다.
     *
     * @param web WebSecurity 객체
     */
    @Override
    public void configure(WebSecurity web) {
        //web.ignoring().antMatchers("");
    }
}
