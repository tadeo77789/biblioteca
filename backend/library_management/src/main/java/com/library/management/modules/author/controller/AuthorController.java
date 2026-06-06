package com.library.management.modules.author.controller;


import com.library.management.modules.author.dto.AuthorRequestDTO;
import com.library.management.modules.author.dto.AuthorResponseDTO;
import com.library.management.modules.author.service.IauthorService;


import lombok.RequiredArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/authors")
@RequiredArgsConstructor
public class AuthorController {



    private final IauthorService service;




    
    @PostMapping
    public ResponseEntity<AuthorResponseDTO> create(
            @RequestBody AuthorRequestDTO dto
    ){

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(dto));

    }





    
    @GetMapping
    public ResponseEntity<List<AuthorResponseDTO>> findAll(){

        return ResponseEntity.ok(
                service.findAll()
        );

    }





    
    @GetMapping("/{id}")
    public ResponseEntity<AuthorResponseDTO> findById(
            @PathVariable Long id
    ){

        return ResponseEntity.ok(
                service.findById(id)
        );

    }





    
    @PutMapping("/{id}")
    public ResponseEntity<AuthorResponseDTO> update(
            @PathVariable Long id,
            @RequestBody AuthorRequestDTO dto
    ){

        return ResponseEntity.ok(
                service.update(id, dto)
        );

    }





    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDelete(
            @PathVariable Long id
    ){

        service.softDelete(id);


        return ResponseEntity
                .noContent()
                .build();

    }


}