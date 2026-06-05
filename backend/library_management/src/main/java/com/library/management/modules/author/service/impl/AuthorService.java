package com.library.management.modules.author.service.impl;


import com.library.management.modules.author.dto.AuthorRequestDTO;
import com.library.management.modules.author.dto.AuthorResponseDTO;
import com.library.management.modules.author.mapper.AuthorMapper;
import com.library.management.modules.author.model.Author;
import com.library.management.modules.author.repository.AuthorRepository;
import com.library.management.modules.author.service.IauthorService;
import org.springframework.stereotype.Service;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@AllArgsConstructor

public class AuthorService implements IauthorService {
   
private final AuthorRepository repository;

private final AuthorMapper mapper;



@Override
public AuthorResponseDTO create(AuthorRequestDTO dto){


Author author = mapper.toEntity(dto);


Author saved = repository.save(author);


return mapper.toDTO(saved);

}



@Override
public List<AuthorResponseDTO> findAll(){


return mapper.toDTOList(repository.findAll());

}



@Override
public AuthorResponseDTO findById(Long id){


Author author = repository.findById(id)
.orElseThrow();


return mapper.toDTO(author);

}
}
