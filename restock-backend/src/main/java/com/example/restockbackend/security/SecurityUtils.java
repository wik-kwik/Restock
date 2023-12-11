package com.example.restockbackend.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Objects;

public class SecurityUtils {
    public static <T extends Authentication> T unwrapSecurityAuthentication(Class<T> expectedClass) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (expectedClass.isInstance(authentication)) {
            return expectedClass.cast(authentication);
        }
        return null;
    }

    public static String unwrapUsername(){
        UsernamePasswordAuthenticationToken upat = SecurityUtils.unwrapSecurityAuthentication(UsernamePasswordAuthenticationToken.class);
        return (String) Objects.requireNonNull(upat).getPrincipal();
    }

    public static String unwrapSensorToken(){
        UsernamePasswordAuthenticationToken upat = SecurityUtils.unwrapSecurityAuthentication(UsernamePasswordAuthenticationToken.class);
        return (String) Objects.requireNonNull(upat).getPrincipal();
    }

}
