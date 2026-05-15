package com.protoserv.dto.exception;

import java.time.LocalDateTime;

public record DadosErroPadraoDTO(
    LocalDateTime dataHora,
    Integer status,
    String erro,
    String mensagem,
    String caminho
) {

}
