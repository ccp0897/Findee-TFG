package com.findee.findeeBackend.rest;

import com.findee.findeeBackend.entities.Empleo;
import com.findee.findeeBackend.services.FindeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/findee")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FindeeRestController {

    @Autowired
    private FindeeService findeeService;
    public FindeeRestController(){}
    public FindeeRestController(FindeeService findeeService) {
        this.findeeService = findeeService;
    }

    @GetMapping("/empleos")
    public List<Empleo>findAllEmpleos(){
        return findeeService.findAllEmpleos();
    }
}
