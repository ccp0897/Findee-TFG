package com.findee.findeeBackend.dao;

import com.findee.findeeBackend.entities.Empleo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleoDao extends JpaRepository<Empleo, Integer> {
}
