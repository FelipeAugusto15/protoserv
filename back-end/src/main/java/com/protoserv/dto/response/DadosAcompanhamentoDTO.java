package com.protoserv.dto.response;

import com.protoserv.model.Acompanhamento;
import java.time.LocalDateTime;

public record DadosAcompanhamentoDTO(
        Long id,
        String autorNome,
        String autorPerfil,
        String descricao,
        LocalDateTime dataRegistro
) {
    public DadosAcompanhamentoDTO(Acompanhamento acompanhamento) {
        this(
                acompanhamento.getId(),
                acompanhamento.getAutor().getNome(),
                acompanhamento.getAutor().getPerfil().name(),
                acompanhamento.getDescricao(),
                acompanhamento.getDataRegistro()
        );
    }
}
