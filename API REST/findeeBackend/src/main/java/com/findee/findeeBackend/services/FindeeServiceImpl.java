package com.findee.findeeBackend.services;

import com.findee.findeeBackend.dao.EmpleoDao;
import com.findee.findeeBackend.entities.Empleo;
import org.springframework.beans.factory.annotation.Autowired;
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
}
