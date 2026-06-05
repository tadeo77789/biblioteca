package com.library.management.modules.author.dto;
    
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorRequestDTO {
    @NotBlank(message = "Name is obligatory")
    @Size(max = 100, message = "max 100 characters")
    private String name;

    @Size(max = 150, message = "max 150 characters")
    private String nationality;
}
