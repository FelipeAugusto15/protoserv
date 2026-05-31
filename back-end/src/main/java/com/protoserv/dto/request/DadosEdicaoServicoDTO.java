package com.protoserv.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record DadosEdicaoServicoDTO(
        
        @NotNull(message = "O ID do serviço é obrigatório.")
        Long id,
        
        String nome,
        String descricao,
        
        @PositiveOrZero(message = "O prazo em dias não pode ser negativo.")
        Integer prazoDias,
        
        String categoria,
        String orientacaoCidadao
) {
}