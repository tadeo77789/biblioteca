package com.library.management.modules.book.dto;

import jakarta.validation.constraints.*;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookRequestDTO {

    @NotBlank
    @Size(max = 150)
    private String title;

    @NotBlank
    @Size(max = 20)
    private String isbn;

    @NotNull
    private Long authorId;

    private Integer publishedYear;

    @Min(0)
    private Integer availableCopies;

    private String coverImageUrl;
}
