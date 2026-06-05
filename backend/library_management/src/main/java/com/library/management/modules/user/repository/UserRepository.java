package com.library.management.modules.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.library.management.modules.user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Query("""
        SELECT u 
        FROM User u
        WHERE
        u.fullName like %?1% OR
        u.email like %?1%
            """)
    List<User> findAll(String filter);

    
}
