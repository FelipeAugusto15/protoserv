package com.protoserv.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "solicitacoes")
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String protocolo;
    private String descricao;

    @Embedded
    private Endereco endereco;

    @Enumerated(EnumType.STRING)
    private StatusSolicitacao status;

    @Enumerated(EnumType.STRING)
    private PrioridadeSolicitacao prioridade;

    private String anexoUrl;

    private LocalDateTime dataAbertura;

    private LocalDateTime dataConclusao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servico_id")
    private Servico servico;

    public Solicitacao(String protocolo, String descricao, Endereco endereco, Servico servico, String anexoUrl) {
        this.protocolo = protocolo;
        this.descricao = descricao;
        this.endereco = endereco;
        this.servico = servico;
        this.anexoUrl = anexoUrl;
        this.status = StatusSolicitacao.NOVO;
        this.prioridade = PrioridadeSolicitacao.MEDIA;
        this.dataAbertura = LocalDateTime.now();
    }
}