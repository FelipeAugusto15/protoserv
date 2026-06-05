package com.protoserv.service;

import com.protoserv.dto.request.DadosAberturaSolicitacaoDTO;
import com.protoserv.dto.response.DadosSolicitacaoDTO;
import com.protoserv.model.Endereco;
import com.protoserv.model.Solicitacao;
import com.protoserv.repository.ServicoRepository;
import com.protoserv.repository.SolicitacaoRepository;
import com.protoserv.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class SolicitacaoService {

    private final SolicitacaoRepository solicitacaoRepository;
    private final ServicoRepository servicoRepository;
    private final UsuarioRepository usuarioRepository;

    public SolicitacaoService(SolicitacaoRepository solicitacaoRepository,
                              ServicoRepository servicoRepository,
                              UsuarioRepository usuarioRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
        this.servicoRepository = servicoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public DadosSolicitacaoDTO abrirSolicitacao(DadosAberturaSolicitacaoDTO dados) {
        
        var servico = servicoRepository.findById(dados.servicoId())
                .orElseThrow(() -> new EntityNotFoundException("Serviço não encontrado no catálogo."));

        String emailUsuarioLogado = SecurityContextHolder.getContext().getAuthentication().getName();
        
        var cidadao = usuarioRepository.findByEmail(emailUsuarioLogado)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        var endereco = new Endereco(
                dados.cep(),
                dados.logradouro(),
                dados.numero(),
                dados.bairro(),
                dados.cidade(),
                dados.estado(),
                dados.complemento()
        );

        String protocolo = gerarProtocoloUnico();

        var solicitacao = new Solicitacao(
                protocolo,
                dados.descricao(),
                endereco,
                servico,
                cidadao,
                dados.anexoUrl()
        );

        solicitacaoRepository.save(solicitacao);

        return new DadosSolicitacaoDTO(solicitacao);
    }

    private String gerarProtocoloUnico() {
        String dataHoje = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String codigoAleatorio = UUID.randomUUID().toString().substring(0, 6).toUpperCase(); 
        
        return dataHoje + "-" + codigoAleatorio;
    }
}