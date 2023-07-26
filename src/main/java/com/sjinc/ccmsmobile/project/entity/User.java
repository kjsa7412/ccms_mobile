package com.sjinc.ccmsmobile.project.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class User implements UserDetails, Serializable {

    //
    private String compCd;
    private String userId;
    private String userNm;
    private String pwd;
    private String chargNm;
    private String deptNm;
    private String posiNm;
    private String telNo;
    private String email;
    private String useYn;
    private String bigo;
    private String regDt;
    private String regUserId;
    private String regUserIp;
    private String updateDt;
    private String updateUserId;
    private String updateUserIp;
    private String loginToken;
    private String accessToken;
    private String refreshToken;

    //
    List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return pwd;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
