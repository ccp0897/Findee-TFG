package com.findee.findeeBackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UsuariosEmpleoId implements Serializable {
    private static final long serialVersionUID = -2440143563855103658L;
    @Column(name = "usuario_id", nullable = false)
    private Integer usuarioId;

    @Column(name = "empleo_id", nullable = false)
    private Integer empleoId;

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Integer getEmpleoId() {
        return empleoId;
    }

    public void setEmpleoId(Integer empleoId) {
        this.empleoId = empleoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UsuariosEmpleoId entity = (UsuariosEmpleoId) o;
        return Objects.equals(this.empleoId, entity.empleoId) &&
                Objects.equals(this.usuarioId, entity.usuarioId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(empleoId, usuarioId);
    }

}