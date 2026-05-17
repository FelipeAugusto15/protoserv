package com.protoserv.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DadosRegistroDTO(
    
    @NotBlank(message = "O nome não pode estar vazio.")
    String nome,

    @NotBlank(message = "O e-mail não pode estar vazio.")
    @Email(message = "O formato do e-mail é inválido.")
    String email,

    @NotBlank(message = "A senha não pode estar vazia.")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres.")
    String senha
) {

}
