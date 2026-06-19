package com.library.management.modules.loan.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class LoanRequestDTO {

    @NotNull(message = "userId is obligatory")
    private Long userId;

    @NotNull(message = "bookId is obligatory")
    private Long bookId;

    @NotNull(message = "dueDate is obligatory")
    @Future(message = "dueDate must be in the future")
    private LocalDate dueDate;
}
