package com.protoserv.dto.request;

import com.protoserv.model.PrioridadeSolicitacao;

public record DadosReclassificacaoSolicitacaoDTO(

    Long servicoId,
    PrioridadeSolicitacao prioridade
) {

}
