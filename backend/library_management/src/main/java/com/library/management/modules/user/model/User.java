package com.library.management.modules.user.model;

import com.library.management.shared.Model.ABaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
@Entity
@Table(name = "users")
@Getter @Setter
@SuperBuilder
@NoArgsConstructor
@Builder
public class User extends ABaseEntity {
    
    @Column(name = "full_name", length = 100)
    private String fullName;

    @Column(length = 100, unique = true)
    private String email;

    @Column(length = 60)
    private String password;

    @Column(length = 20)
    private String phone;

    @Column(name = "profile_image_url", length = 250)
    private String profileImageUrl;
    
}
