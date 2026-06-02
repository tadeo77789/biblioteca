package com.library.management.modules.user.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder

public class UserRequestDTO {

    @NotBlank(message = "Name is obligatory")
    @Size(max = 100, message = "max 100 characters")
    private String fullName;

    @NotBlank(message = "email is obligatory")
    @Email(message = "email is not valid")
    private String email;

    @NotBlank(message = "password is obligatory")
    @Size(min = 6,message = "min 6 characters")
    private String password;


    @Size(max = 20)
    private String phone;

    private String profileImageUrl;
}
