package com.library.management.modules.book.service.impl;
import java.util.List;

import org.springframework.stereotype.Service;

import com.library.management.modules.author.model.Author;
import com.library.management.modules.author.repository.AuthorRepository;
import com.library.management.modules.book.dto.BookRequestDTO;
import com.library.management.modules.book.dto.BookResponseDTO;
import com.library.management.modules.book.mapper.BookMapper;
import com.library.management.modules.book.model.Book;
import com.library.management.modules.book.repository.BookRepository;
import com.library.management.modules.book.service.IBookService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookService implements IBookService {

    private final BookRepository repository;

    private final AuthorRepository authorRepository;

    private final BookMapper mapper;

    @Override
    public BookResponseDTO create(BookRequestDTO dto) {

        Author author = authorRepository.findById(dto.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));

        Book book = mapper.toEntity(dto);

        book.setAuthor(author);

        Book saved = repository.save(book);

        return mapper.toDTO(saved);
    }

   @Override
    public List<BookResponseDTO> findAll(String title, String author) {

    List<Book> books;

    if (title != null && !title.isBlank()
            && author != null && !author.isBlank()) {

        books = repository
                .findByTitleContainingIgnoreCaseAndAuthor_NameContainingIgnoreCase(
                        title,
                        author);

    } else if (title != null && !title.isBlank()) {

        books = repository.findByTitleContainingIgnoreCase(title);

    } else if (author != null && !author.isBlank()) {

        books = repository.findByAuthor_NameContainingIgnoreCase(author);

    } else {

        books = repository.findAll();

    }

    return mapper.toDTOList(books);
}

    @Override
    public BookResponseDTO findById(Long id) {

        Book book = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        return mapper.toDTO(book);

    }

    @Override
    public BookResponseDTO update(Long id, BookRequestDTO dto) {

        Book book = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Author author = authorRepository.findById(dto.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));

        book.setTitle(dto.getTitle());
        book.setIsbn(dto.getIsbn());
        book.setAuthor(author);
        book.setPublishedYear(dto.getPublishedYear());
        book.setAvailableCopies(dto.getAvailableCopies());
        book.setCoverImageUrl(dto.getCoverImageUrl());

        Book updated = repository.save(book);

        return mapper.toDTO(updated);

    }

    @Override
    public void softDelete(Long id) {

        Book book = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        repository.delete(book);

    }

}