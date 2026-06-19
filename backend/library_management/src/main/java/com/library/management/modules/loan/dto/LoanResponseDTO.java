package com.library.management.modules.loan.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonView;
import com.library.management.modules.loan.util.Views;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class LoanResponseDTO {
    @JsonView(Views.Summary.class)
    private Long id;
    @JsonView(Views.Summary.class)
    private Long userId;
    @JsonView(Views.Summary.class)
    private Long bookId;
    @JsonView(Views.Detail.class)
    private LocalDate loanDate;
    @JsonView(Views.Detail.class)
    private LocalDate dueDate;
    @JsonView(Views.Detail.class)
    private LocalDate returnDate;
    @JsonView(Views.Detail.class)
    private boolean returned;
    @JsonView(Views.Detail.class)
    private LocalDateTime createdAt;
}
