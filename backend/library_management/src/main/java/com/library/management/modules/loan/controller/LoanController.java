package com.library.management.modules.loan.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.library.management.modules.loan.dto.LoanRequestDTO;
import com.library.management.modules.loan.dto.LoanResponseDTO;
import com.library.management.modules.loan.service.impl.LoanService;
import com.library.management.modules.loan.util.Views;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/loan")
public class LoanController {

    private final LoanService service;

    @PostMapping()
    public ResponseEntity<LoanResponseDTO> createLoan(@Validated @RequestBody LoanRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createLoan(requestDTO));
    }

    @GetMapping("")
    @JsonView(Views.Summary.class)
    public ResponseEntity<List<LoanResponseDTO>> getLoans(@RequestParam(defaultValue = "") String filter) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.findAll(filter));
    }

    @GetMapping("/{id}")
    @JsonView(Views.Detail.class)
    public ResponseEntity<LoanResponseDTO> getById(@PathVariable long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.findById(id));
    }

    @PatchMapping("/{id}/return")
    @JsonView(Views.Detail.class)
    public ResponseEntity<LoanResponseDTO> returnLoan(@PathVariable long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.returnLoan(id));
    }
}
