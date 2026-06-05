package com.protoserv.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.protoserv.dto.request.DadosAberturaSolicitacaoDTO;
import com.protoserv.dto.response.DadosSolicitacaoDTO;
import com.protoserv.service.SolicitacaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;

    public SolicitacaoController(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('CIDADAO')")
    public ResponseEntity<DadosSolicitacaoDTO> abrir(@RequestBody @Valid DadosAberturaSolicitacaoDTO dados, UriComponentsBuilder uriBuilder) {
        
        var solicitacao = solicitacaoService.abrirSolicitacao(dados);

        var uri = uriBuilder.path("/solicitacoes/{id}").buildAndExpand(solicitacao.id()).toUri();

        return ResponseEntity.created(uri).body(solicitacao);
    }
}
