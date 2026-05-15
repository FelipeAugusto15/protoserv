package com.protoserv.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.protoserv.dto.exception.DadosErroPadraoDTO;
import com.protoserv.dto.exception.DadosErroValidacaoDTO;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class TratadorDeErrosGlobal {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<DadosErroPadraoDTO> tratarArgumentoInvalido(IllegalArgumentException ex, HttpServletRequest request) {
        DadosErroPadraoDTO erro = new DadosErroPadraoDTO(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Requisição Inválida",
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<DadosErroValidacaoDTO> tratarValidacao(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> erros = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String nomeCampo = ((FieldError) error).getField();
            String mensagemErro = error.getDefaultMessage();
            erros.put(nomeCampo, mensagemErro);
        });

        DadosErroValidacaoDTO erro = new DadosErroValidacaoDTO(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Erro de Validação",
                "Verifique os campos enviados e tente novamente.",
                request.getRequestURI(),
                erros
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }
}
