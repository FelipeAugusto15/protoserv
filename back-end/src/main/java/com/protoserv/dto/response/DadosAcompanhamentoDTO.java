package com.protoserv.dto.response;

import com.protoserv.model.Acompanhamento;
import java.time.LocalDateTime;

public record DadosAcompanhamentoDTO(
        String autorNome,
        String autorPerfil,
        String descricao,
        String anexoUrl,
        LocalDateTime dataRegistro
) {
    public DadosAcompanhamentoDTO(Acompanhamento acompanhamento) {
        this(
                acompanhamento.getAutor() != null ? acompanhamento.getAutor().getNome() : "SISTEMA",
                acompanhamento.getAutor() != null ? acompanhamento.getAutor().getPerfil().name() : "SISTEMA",
                acompanhamento.getDescricao(),
                acompanhamento.getAnexoUrl(),
                acompanhamento.getDataRegistro()
        );
    }
}
