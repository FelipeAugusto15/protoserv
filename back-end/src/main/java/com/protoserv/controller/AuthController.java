package com.protoserv.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.protoserv.dto.request.DadosLoginDTO;
import com.protoserv.dto.request.DadosRegistroDTO;
import com.protoserv.dto.response.DadosAutenticacaoDTO;
import com.protoserv.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/autenticacao")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<DadosAutenticacaoDTO> registrar(@Valid @RequestBody DadosRegistroDTO registro) {
        DadosAutenticacaoDTO authResposta = authService.registrar(registro);

        return ResponseEntity.status(HttpStatus.CREATED).body(authResposta);
    }

    @PostMapping("/login")
    public ResponseEntity<DadosAutenticacaoDTO> login(@Valid @RequestBody DadosLoginDTO login) {
        DadosAutenticacaoDTO authResposta = authService.login(login);

        return ResponseEntity.ok(authResposta);
    }
    
    
}
