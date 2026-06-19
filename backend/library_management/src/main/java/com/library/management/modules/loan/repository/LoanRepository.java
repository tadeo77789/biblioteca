package com.library.management.modules.loan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.library.management.modules.loan.model.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    List<Loan> findByUserId(Long userId);

    List<Loan> findByReturned(boolean returned);

    @Query("""
        SELECT l
        FROM Loan l
        WHERE
        CAST(l.user.id AS string) like %?1% OR
        CAST(l.bookId AS string) like %?1%
            """)
    List<Loan> findAll(String filter);
}
