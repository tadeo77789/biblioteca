package com.library.management.modules.book.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponseDTO {

    private Long id;

    private String title;

    private String isbn;

    private String authorName;

    private Integer publishedYear;

    private Integer availableCopies;

    private String coverImageUrl;

    private LocalDateTime createdAt;
}
