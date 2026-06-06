package com.library.management.modules.author.repository;


import com.library.management.modules.author.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository 
extends JpaRepository<Author,Long>{

}