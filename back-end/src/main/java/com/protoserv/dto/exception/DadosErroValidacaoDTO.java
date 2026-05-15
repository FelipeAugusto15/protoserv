package com.protoserv.dto.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record DadosErroValidacaoDTO(
    LocalDateTime dataHora,
    Integer status,
    String erro,
    String mensagem,
    String caminho,
    Map<String, String> camposComErro
) {

}
