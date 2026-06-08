package com.library.management.modules.user.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonView;
import com.library.management.modules.user.util.Views;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder

public class UserResponseDTO {
    @JsonView(Views.Summary.class)
    private Long id;
    @JsonView(Views.Summary.class)
    private String fullName;
    @JsonView(Views.Detail.class)
    private String email;
    @JsonView(Views.Detail.class)
    private String phone;
    @JsonView(Views.Detail.class)
    private String profileImageUrl;
    @JsonView(Views.Detail.class)
    private LocalDateTime createdAt;
}
