package com.protoserv.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DadosLoginDTO(

    @NotBlank(message = "O e-mail não pode estar vazio.")
    @Email(message = "O formato do e-mail é inválido.")
    String email,

    @NotBlank(message = "A senha não pode estar vazia.")
    String senha
) {

}
