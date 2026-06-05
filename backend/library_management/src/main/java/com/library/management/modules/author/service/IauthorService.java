package com.library.management.modules.author.service;

import com.library.management.modules.author.dto.AuthorRequestDTO;
import com.library.management.modules.author.dto.AuthorResponseDTO;
import java.util.List;

public interface IauthorService {
     
AuthorResponseDTO create(AuthorRequestDTO dto);


List<AuthorResponseDTO> findAll();


AuthorResponseDTO findById(Long id);
}
