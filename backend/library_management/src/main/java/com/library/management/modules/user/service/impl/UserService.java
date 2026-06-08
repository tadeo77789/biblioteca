package com.library.management.modules.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.management.modules.user.dto.UserRequestDTO;
import com.library.management.modules.user.dto.UserResponseDTO;
import com.library.management.modules.user.mapper.UserMapper;
import com.library.management.modules.user.model.User;
import com.library.management.modules.user.repository.UserRepository;
import com.library.management.modules.user.service.IuserServices;

@Service
public class UserService implements IuserServices {

    @Autowired
    public UserRepository data;
    @Autowired
    public UserMapper mapper;
    
    @Override
    public UserResponseDTO createUser(UserRequestDTO userDto ) {
       User user = mapper.toEntity(userDto);
       User saved = data.save(user); 
       return mapper.toDTO(saved);
    }

    @Override
    public List<UserResponseDTO> findAll(String filter) {
        return mapper.toDTOList(data.findAll(filter));
    }

     @Override
    public UserResponseDTO findById(long id) {
        var user=data.findById(id);
        if(user.isEmpty())
            return null;
        return mapper.toDTO(user.get());
    }
}
