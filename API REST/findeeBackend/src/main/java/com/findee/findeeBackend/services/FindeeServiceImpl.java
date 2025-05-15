package com.findee.findeeBackend.services;

import com.findee.findeeBackend.dao.EmpleoDao;
import com.findee.findeeBackend.entities.Empleo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FindeeServiceImpl implements FindeeService {
    @Autowired
    EmpleoDao empleoDao;

    public FindeeServiceImpl(){}
    public FindeeServiceImpl(EmpleoDao empleoDao) {
        this.empleoDao = empleoDao;
    }

    @Override
    public List<Empleo> findAllEmpleos() {
        return empleoDao.findAll();
    }

    @Override
    public Page<Empleo> getAllEmpleos(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return empleoDao.findAll(pageable);
    }
}
