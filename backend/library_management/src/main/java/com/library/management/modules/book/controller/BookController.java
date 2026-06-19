package com.library.management.modules.book.controller;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.management.modules.book.dto.BookRequestDTO;
import com.library.management.modules.book.dto.BookResponseDTO;
import com.library.management.modules.book.service.IBookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final IBookService service;

    @PostMapping
    public ResponseEntity<BookResponseDTO> create(
            @RequestBody BookRequestDTO dto
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(dto));

    }

    @GetMapping
    public ResponseEntity<List<BookResponseDTO>> findAll() {

        return ResponseEntity.ok(
                service.findAll()
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDTO> findById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                service.findById(id)
        );

    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponseDTO> update(
            @PathVariable Long id,
            @RequestBody BookRequestDTO dto
    ) {

        return ResponseEntity.ok(
                service.update(id, dto)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDelete(
            @PathVariable Long id
    ) {

        service.softDelete(id);

        return ResponseEntity
                .noContent()
                .build();

    }

}