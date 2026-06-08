package com.library.management.modules.book.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.library.management.modules.book.dto.BookRequestDTO;
import com.library.management.modules.book.dto.BookResponseDTO;
import com.library.management.modules.book.model.Book;

@Mapper(componentModel = "spring")
public interface BookMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Book toEntity(BookRequestDTO dto);

    @Mapping(source = "author.fullName", target = "authorName")
    BookResponseDTO toDTO(Book book);

    List<BookResponseDTO> toDTOList(List<Book> books);
}