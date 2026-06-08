package com.library.management.modules.user.mapper;

import com.library.management.modules.user.dto.UserRequestDTO;
import com.library.management.modules.user.dto.UserResponseDTO;
import com.library.management.modules.user.model.User;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toEntity(UserRequestDTO dto);

    UserResponseDTO toDTO(User user);

    List<UserResponseDTO> toDTOList(List<User> users);
}