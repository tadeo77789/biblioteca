package com.library.management.modules.loan.service.abst;

import com.library.management.modules.loan.dto.LoanRequestDTO;
import com.library.management.modules.loan.dto.LoanResponseDTO;
import com.library.management.modules.loan.repository.LoanRepository;
import com.library.management.modules.loan.service.IloanServices;

public abstract class ALoan implements IloanServices {
    protected final LoanRepository repository;

    protected ALoan(LoanRepository repository) {
        this.repository = repository;
    }

    @Override
    public abstract LoanResponseDTO createLoan(LoanRequestDTO loanDto);
}
