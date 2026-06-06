package com.library.management.modules.loan.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.library.management.modules.loan.dto.LoanResponseDTO;
import com.library.management.modules.loan.model.Loan;

@Mapper(componentModel = "spring")
public interface LoanMapper {

    @Mapping(target = "userId", source = "user.id")
    LoanResponseDTO toDTO(Loan loan);

    List<LoanResponseDTO> toDTOList(List<Loan> loans);
}
