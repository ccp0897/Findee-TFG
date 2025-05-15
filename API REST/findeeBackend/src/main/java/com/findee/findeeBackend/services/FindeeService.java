package com.findee.findeeBackend.services;

import com.findee.findeeBackend.entities.Empleo;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FindeeService {

    List<Empleo> findAllEmpleos();
    Page<Empleo> getAllEmpleos(int page, int size);
}
