package com.findee.findeeBackend.dao;

import com.findee.findeeBackend.entities.Empleo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface EmpleoDao extends JpaRepository<Empleo, Integer>, JpaSpecificationExecutor<Empleo> {
    //Buscar empleos de forma paginada
    Page<Empleo> findAll(Pageable pageable);

    //Buscar los tipo de empleo
    @Query("select distinct e.remote from Empleo e where e.remote !='null' ")
    List<String>findDistinctByTipoEmpleo();
    //Buscar los tipo de contrato
    @Query("select distinct e.contractType from Empleo e where e.contractType != 'null'")
    List<String>findDistinctByTipoContrato();
    //Buscar por tipo de jornada
    @Query("select distinct e.workday from Empleo e where e.workday != 'null'")
    List<String>findDistinctByTipoJornada();
    //Buscar por ciudad
    @Query("select distinct e.city from Empleo e where e.city != 'null'")
    List<String>findDistinctByCiudad();
    //Buscar por categoria de trabajo
    @Query("select distinct e.jobCategory from Empleo e")
    List<String>findDistinctByCategoriaTrabajo();
}
