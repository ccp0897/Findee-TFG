package com.findee.findeeBackend.rest;

import com.findee.findeeBackend.dto.UsuarioUpdateDTO;
import com.findee.findeeBackend.entities.Empleo;
import com.findee.findeeBackend.entities.Usuario;
import com.findee.findeeBackend.services.FindeeService;
import com.findee.findeeBackend.services.UsuarioService;
import com.findee.findeeBackend.utilities.PdfTextExtractor;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/findee")
public class FindeeRestController {

    @Autowired
    private FindeeService findeeService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private PdfTextExtractor pdfTextExtractor;

    public FindeeRestController(){}
    public FindeeRestController(FindeeService findeeService, UsuarioService usuarioService) {
        this.findeeService = findeeService;
        this.usuarioService = usuarioService;
    }

//    @GetMapping("/empleos")
//    public List<Empleo>findAllEmpleos(){
//        return findeeService.findAllEmpleos();
//    }

    @GetMapping("/empleos")
    public ResponseEntity<Page<Empleo>> getAllEmpleos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String tipoEmpleo,
            @RequestParam(required = false) String tipoContrato,
            @RequestParam(required = false) String tipoJornada,
            @RequestParam(required = false) String ciudad,
            @RequestParam(required = false) String categoriaTrabajo) {

        return ResponseEntity.ok(findeeService.getAllEmpleosFiltrados(
                page, size,
                tipoEmpleo, tipoContrato, tipoJornada,
                ciudad, categoriaTrabajo
        ));
    }

    @GetMapping("/empleos/filtro")
    public ResponseEntity<Map<String, List<String>>> obtenerOpcionesFiltro(){
        return ResponseEntity.ok(findeeService.obtenerOpcionesFiltro());
    }


    //Servicios para favoritos

    //Agregar favortios
    @PostMapping("/favoritos/agregar")
    public ResponseEntity<?> agregarFavorito(@RequestParam Integer empleoId, Authentication authentication){
        try{
            Integer usuarioId = findeeService.obtenerUsuarioId(authentication);
            findeeService.agregarFavorito(usuarioId, empleoId);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Eliminar de favoritos
    @DeleteMapping("/favoritos/eliminar")
    public ResponseEntity<?> eliminarFavorito(@RequestParam Integer empleoId, Authentication authentication){
        try{
            Integer usuarioId = findeeService.obtenerUsuarioId(authentication);
            findeeService.eliminarFavorito(usuarioId, empleoId);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Obtener los favoritos de un usuario
    @GetMapping("/favoritos")
    public ResponseEntity<?> obtenerFavoritos(Authentication authentication){
        try{
            Integer usuarioId = findeeService.obtenerUsuarioId(authentication);
            return ResponseEntity.ok(findeeService.obtenerFavoritosPorUsuario(usuarioId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Ver si un empleo ya esta en favoritos de un usuario
    @GetMapping("/favoritos/verificar")
    public ResponseEntity<?> verificarFavorito(@RequestParam Integer empleoId, Authentication authentication){
        try{
            Integer usuarioId = findeeService.obtenerUsuarioId(authentication);
            return ResponseEntity.ok(findeeService.esFavorito(usuarioId, empleoId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //Obtener usuario por id
    @GetMapping("/usuario")
    public ResponseEntity<?> obtenerUsuarioPorId(Authentication id){
        try{
            return ResponseEntity.ok(usuarioService.obtenerUsuarioPorId(findeeService.obtenerUsuarioId(id)));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Actualizar usuario
    @PutMapping("/usuario")
    public ResponseEntity<?> actualizarUsuario(Authentication authentication, @RequestBody UsuarioUpdateDTO usuarioUpdate){
        Usuario usuario = usuarioService.obtenerUsuarioPorId(findeeService.obtenerUsuarioId(authentication));

        try {
            if (usuario == null){
                return ResponseEntity.badRequest().body("El usuario no existe");
            }

            usuario.setNombre(usuarioUpdate.getNombre());
            usuario.setDescripcion(usuarioUpdate.getDescripcion());

            if(usuarioUpdate.getHabilidades() != null){
                usuario.setHabilidades(new Gson().toJson(usuarioUpdate.getHabilidades()));
            }

            Usuario usuarioActualizado = usuarioService.save(usuario);

            return ResponseEntity.ok(usuarioActualizado);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    //Actualizar cv
    @PutMapping("/usuario/cv")
    public ResponseEntity<?> actualizarCV(Authentication authentication, @RequestParam("cvFile") MultipartFile cvFile){

        try {
            Usuario usuario = usuarioService.obtenerUsuarioPorId(findeeService.obtenerUsuarioId(authentication));

            if(!cvFile.getContentType().equals("application/pdf")){
                return ResponseEntity.badRequest().body("El archivo no es de tipo PDF");
            }

            String cvTexto = pdfTextExtractor.extractText(cvFile.getInputStream());

            usuario.setCv(cvTexto);
            usuarioService.save(usuario);

            return ResponseEntity.ok().build();
        }catch (IOException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
