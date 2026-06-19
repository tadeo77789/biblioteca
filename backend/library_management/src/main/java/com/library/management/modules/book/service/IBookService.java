package com.library.management.modules.book.service;
import java.util.List;

import com.library.management.modules.book.dto.BookRequestDTO;
import com.library.management.modules.book.dto.BookResponseDTO;

public interface IBookService {

    BookResponseDTO create(BookRequestDTO dto);

    List<BookResponseDTO> findAll(String title, String author);
    BookResponseDTO findById(Long id);

    BookResponseDTO update(Long id, BookRequestDTO dto);

    void softDelete(Long id);

}