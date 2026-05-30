package com.protoserv.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "servicos")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private Integer prazoDias;
    private boolean ativo;

    @Enumerated(EnumType.STRING)
    private CategoriaServico categoria;

    private String orientacaoCidadao;

    public Servico(String nome, String descricao, Integer prazoDias, CategoriaServico categoria, String orientacaoCidadao) {
        if (prazoDias != null && prazoDias < 0) {
            throw new IllegalArgumentException("O prazo em dias não pode ser negativo.");
        }
        this.nome = nome;
        this.descricao = descricao;
        this.prazoDias = prazoDias;
        this.categoria = categoria;
        this.orientacaoCidadao = orientacaoCidadao;
        this.ativo = true;
    }

    public void atualizarDados(String novoNome, String novaDescricao, Integer novoPrazo, CategoriaServico novaCategoria, String novaOrientacao) {
        if (novoPrazo != null && novoPrazo < 0) {
            throw new IllegalArgumentException("O prazo em dias não pode ser negativo.");
        }
        this.nome = novoNome;
        this.descricao = novaDescricao;
        this.prazoDias = novoPrazo;
        this.categoria = novaCategoria;
        this.orientacaoCidadao = novaOrientacao;
    }

    public void desativar() {
        if (!this.ativo) {
            throw new IllegalArgumentException("O serviço já está inativo.");
        }
        
        this.ativo = false;
    }

    public void ativar() {
        if (this.ativo) {
            throw new IllegalArgumentException("O serviço já está ativo.");
        }
        
        this.ativo = true;
    }
}