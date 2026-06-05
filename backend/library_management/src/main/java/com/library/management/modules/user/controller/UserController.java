package com.library.management.modules.user.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.library.management.modules.user.dto.UserRequestDTO;
import com.library.management.modules.user.dto.UserResponseDTO;
import com.library.management.modules.user.service.impl.UserService;
import com.library.management.modules.user.util.Views;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    @PostMapping()
    public ResponseEntity<UserResponseDTO> postMethodName(@Validated @RequestBody UserRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createUser(requestDTO));
    }

    @GetMapping("")
    @JsonView(Views.Summary.class)
    public ResponseEntity<List<UserResponseDTO>> getUsers(@RequestParam(defaultValue = "") String filter) {
         return ResponseEntity.status(HttpStatus.OK)
                .body(service.findAll(filter));
    }

    @GetMapping("/{id}")
    @JsonView(Views.Detail.class)
    public ResponseEntity<UserResponseDTO> getById(@PathVariable long id) {
         return ResponseEntity.status(HttpStatus.OK)
                .body(service.findById(id));
    }

}
