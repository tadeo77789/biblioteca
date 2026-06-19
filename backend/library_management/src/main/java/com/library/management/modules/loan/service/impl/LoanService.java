package com.library.management.modules.loan.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.library.management.modules.loan.dto.LoanRequestDTO;
import com.library.management.modules.loan.dto.LoanResponseDTO;
import com.library.management.modules.loan.mapper.LoanMapper;
import com.library.management.modules.loan.model.Loan;
import com.library.management.modules.loan.repository.LoanRepository;
import com.library.management.modules.loan.service.IloanServices;
import com.library.management.modules.user.model.User;
import com.library.management.modules.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoanService implements IloanServices {

    private final LoanRepository data;
    private final UserRepository userData;
    private final LoanMapper mapper;

    @Override
    public LoanResponseDTO createLoan(LoanRequestDTO loanDto) {
        User user = userData.findById(loanDto.getUserId()).orElse(null);
        if (user == null)
            return null;

        Loan loan = Loan.builder()
                .user(user)
                .bookId(loanDto.getBookId())
                .loanDate(LocalDate.now())
                .dueDate(loanDto.getDueDate())
                .returned(false)
                .status(true)
                .build();

        Loan saved = data.save(loan);
        return mapper.toDTO(saved);
    }

    @Override
    public List<LoanResponseDTO> findAll(String filter) {
        return mapper.toDTOList(data.findAll(filter));
    }

    @Override
    public LoanResponseDTO findById(long id) {
        var loan = data.findById(id);
        if (loan.isEmpty())
            return null;
        return mapper.toDTO(loan.get());
    }

    @Override
    public LoanResponseDTO returnLoan(long id) {
        var optional = data.findById(id);
        if (optional.isEmpty())
            return null;

        Loan loan = optional.get();
        loan.setReturned(true);
        loan.setReturnDate(LocalDate.now());

        return mapper.toDTO(data.save(loan));
    }
}
