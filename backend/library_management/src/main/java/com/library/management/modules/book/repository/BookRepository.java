package com.library.management.modules.book.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.management.modules.book.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByIsbn(String isbn);

    boolean existsByIsbn(String isbn);

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByAuthor_NameContainingIgnoreCase(String author);

    List<Book> findByTitleContainingIgnoreCaseAndAuthor_NameContainingIgnoreCase(
            String title,
            String author
    );
}