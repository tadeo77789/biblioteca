package com.library.management.modules.user.service;

import java.util.List;

import com.library.management.modules.user.dto.UserRequestDTO;
import com.library.management.modules.user.dto.UserResponseDTO;

public interface IuserServices {

    /*
    create
    update
    parctial
    delete logic
    delete
    
    */

    public UserResponseDTO createUser(UserRequestDTO userDto);
    public List<UserResponseDTO> findAll(String filter);
    public UserResponseDTO findById(long id);
} 