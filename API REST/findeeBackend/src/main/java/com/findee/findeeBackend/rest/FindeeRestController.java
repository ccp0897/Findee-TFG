package com.findee.findeeBackend.rest;

import com.findee.findeeBackend.entities.Empleo;
import com.findee.findeeBackend.services.FindeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/findee")
public class FindeeRestController {

    @Autowired
    private FindeeService findeeService;
    public FindeeRestController(){}
    public FindeeRestController(FindeeService findeeService) {
        this.findeeService = findeeService;
    }

//    @GetMapping("/empleos")
//    public List<Empleo>findAllEmpleos(){
//        return findeeService.findAllEmpleos();
//    }

    @GetMapping("/empleos")
    public ResponseEntity<Page<Empleo>> getAllEmpleos(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(findeeService.getAllEmpleos(page, size));
    }
}
