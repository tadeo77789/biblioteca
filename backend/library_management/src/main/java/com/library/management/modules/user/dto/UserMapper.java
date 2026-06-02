package com.library.management.modules.user.dto;

import com.library.management.modules.user.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserRequestDTO dto);
    UserResponseDTO toDTO(User user);
}