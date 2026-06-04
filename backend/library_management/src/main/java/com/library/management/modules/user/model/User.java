package com.library.management.modules.user.model;
import java.time.LocalDateTime;

import com.library.management.modules.user.model.baseEntity.ABaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
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
    
    

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate(){
        updatedAt = LocalDateTime.now();
    }
}
