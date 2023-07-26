package com.sjinc.ccmsmobile;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * 주요 사항 :
 * - SpringBootServletInitializer를 상속하여 WAR 파일로 배포할 수 있도록 합니다.
 * - configure() 메서드를 오버라이드하여 SpringApplicationBuilder를 구성합니다.
 */
public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder springApplicationBuilder) {
        // SpringApplicationBuilder를 구성하여 CcmsMobileApplication 클래스를 소스로 사용합니다.
        return springApplicationBuilder.sources(CcmsMobileApplication.class);
    }

}
