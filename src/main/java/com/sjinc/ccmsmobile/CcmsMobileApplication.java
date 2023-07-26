package com.sjinc.ccmsmobile;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;

/**
 * 주요 사항 :
 * - Spring Boot 애플리케이션의 주요 클래스인 CcmsMobileApplication 클래스입니다.
 * - main() 메서드는 애플리케이션의 진입점입니다. SpringApplication.run()으로 Spring Boot 애플리케이션을 실행합니다.
 * - sqlSessionFactory() 메서드는 SqlSessionFactory를 생성하여 반환합니다.
 * - SqlSessionFactoryBean을 사용하여 데이터 소스와 매퍼 위치, MyBatis 구성 파일의 위치를 설정합니다.
 */

@SpringBootApplication
public class CcmsMobileApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        // Spring Boot 애플리케이션을 실행합니다.
        SpringApplication.run(CcmsMobileApplication.class, args);
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        // SqlSessionFactoryBean 인스턴스를 생성합니다.
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();

        // 데이터 소스를 SqlSessionFactory에 설정합니다.
        sessionFactory.setDataSource(dataSource);

        // 매퍼 위치를 지정합니다.
        Resource[] res = new PathMatchingResourcePatternResolver().getResources("classpath:mappers/*.xml");
        sessionFactory.setMapperLocations(res);

        // MyBatis 구성 파일의 위치를 지정합니다.
        Resource resConfig = new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml");
        sessionFactory.setConfigLocation(resConfig);

        // 생성된 SqlSessionFactory를 반환합니다.
        return sessionFactory.getObject();
    }
}