package com.protoserv.controller;

import com.protoserv.dto.response.DadosListagemUsuarioDTO;
import com.protoserv.model.StatusUsuario;
import com.protoserv.service.UsuarioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<DadosListagemUsuarioDTO>> listar(
            @RequestParam(required = false) StatusUsuario status,
            @PageableDefault(size = 10, sort = {"nome"}) Pageable paginacao) {
        
        Page<DadosListagemUsuarioDTO> page = usuarioService.listarUsuario(status, paginacao);
        return ResponseEntity.ok(page);
    }

    @DeleteMapping("/inativar/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        usuarioService.inativarUsuario(id);
        
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/ativar/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> ativar(@PathVariable Long id) {
        usuarioService.ativarUsuario(id);
        
        return ResponseEntity.noContent().build();
    }
}