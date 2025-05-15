package com.findee.findeeBackend.dao;

import com.findee.findeeBackend.entities.Empleo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface EmpleoDao extends JpaRepository<Empleo, Integer> {
    Page<Empleo> findAll(Pageable pageable);
}
