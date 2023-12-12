package com.example.restockbackend.dto.mapper;

import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.dto.domain.UserDTO;
import com.example.restockbackend.security.UserDetailsImpl;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends BasicMapper<UserDTO, UserEntity> {
    UserDetailsImpl mapToUserDetails(UserEntity userEntity);
}
