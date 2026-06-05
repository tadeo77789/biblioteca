package com.library.management.modules.user.service.abst;

import com.library.management.modules.user.dto.UserRequestDTO;
import com.library.management.modules.user.dto.UserResponseDTO;
import com.library.management.modules.user.repository.UserRepository;
import com.library.management.modules.user.service.IuserServices;

public abstract class AUser implements IuserServices {
    protected final UserRepository repository;
    protected AUser(UserRepository repository){
        this.repository = repository;
    }

    @Override 
    public abstract UserResponseDTO createUser(UserRequestDTO userDto );
    // public List<UserResponseDTO> findAll(String filter);
    // public UserResponseDTO findById(long id);
}
