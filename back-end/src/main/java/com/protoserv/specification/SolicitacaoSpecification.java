package com.protoserv.specification;

import com.protoserv.model.Solicitacao;
import com.protoserv.model.StatusSolicitacao;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class SolicitacaoSpecification {

    public static Specification<Solicitacao> comFiltros(
            StatusSolicitacao status, 
            Long servicoId,
            String logradouro,
            String bairro,
            String cidade,
            String estado,
            String nomeAtendente,
            LocalDate dataInicial, 
            LocalDate dataFinal) {

        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (status != null) {
                predicates.add(builder.equal(root.get("status"), status));
            }

            if (servicoId != null) {
                predicates.add(builder.equal(root.get("servico").get("id"), servicoId));
            }
            
            if (logradouro != null && !logradouro.isBlank()) {
                predicates.add(builder.like(
                        builder.lower(root.get("endereco").get("logradouro")), 
                        "%" + logradouro.toLowerCase() + "%"
                ));
            }

            if (bairro != null && !bairro.isBlank()) {
                predicates.add(builder.like(
                        builder.lower(root.get("endereco").get("bairro")), 
                        "%" + bairro.toLowerCase() + "%"
                ));
            }

            if (cidade != null && !cidade.isBlank()) {
                predicates.add(builder.like(
                        builder.lower(root.get("endereco").get("cidade")), 
                        "%" + cidade.toLowerCase() + "%"
                ));
            }

            if (estado != null && !estado.isBlank()) {
                predicates.add(builder.like(
                        builder.lower(root.get("endereco").get("estado")), 
                        "%" + estado.toLowerCase() + "%"
                ));
            }

            if (nomeAtendente != null && !nomeAtendente.trim().isEmpty()) {
                predicates.add(builder.like(
                        builder.lower(root.get("atendente").get("nome")), 
                        "%" + nomeAtendente.toLowerCase() + "%"
                ));
            }

            if (dataInicial != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("dataAbertura"), dataInicial.atStartOfDay()));
            }

            if (dataFinal != null) {
                predicates.add(builder.lessThanOrEqualTo(root.get("dataAbertura"), dataFinal.atTime(LocalTime.MAX)));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}