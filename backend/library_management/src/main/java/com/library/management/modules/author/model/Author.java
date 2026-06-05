package com.library.management.modules.author.model;

import com.library.management.shared.Model.ABaseEntity;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
@Entity
@Table(name = "authors")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@Builder
public class Author extends ABaseEntity {
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "biography", length = 500)
    private String biography;
    
    @Column(name = "is_alived")
    private Boolean isAlived;

}
