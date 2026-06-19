package com.library.management.modules.loan.service;

import java.util.List;

import com.library.management.modules.loan.dto.LoanRequestDTO;
import com.library.management.modules.loan.dto.LoanResponseDTO;

public interface IloanServices {

    /*
    create
    findAll
    findById
    return loan
    */

    public LoanResponseDTO createLoan(LoanRequestDTO loanDto);
    public List<LoanResponseDTO> findAll(String filter);
    public LoanResponseDTO findById(long id);
    public LoanResponseDTO returnLoan(long id);
}
