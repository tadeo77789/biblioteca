package com.library.management.modules.author.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.library.management.modules.author.dto.AuthorRequestDTO;
import com.library.management.modules.author.dto.AuthorResponseDTO;
import com.library.management.modules.author.model.Author;

@Mapper(componentModel = "spring")
public interface AuthorMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Author toEntity(AuthorRequestDTO dto);

    AuthorResponseDTO toDTO(Author author);

    List<AuthorResponseDTO> toDTOList(List<Author> authors);
}

