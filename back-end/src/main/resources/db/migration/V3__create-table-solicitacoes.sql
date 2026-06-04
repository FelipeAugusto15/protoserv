CREATE TABLE solicitacoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    protocolo VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT NOT NULL,

    cep VARCHAR(20) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    complemento VARCHAR(255),
    
    status VARCHAR(30) NOT NULL,
    prioridade VARCHAR(30) NOT NULL,
    anexo_url VARCHAR(255),
    
    data_abertura DATETIME NOT NULL,
    data_conclusao DATETIME,
    
    servico_id BIGINT NOT NULL,
    cidadao_id BIGINT NOT NULL,
    atendente_id BIGINT,

    CONSTRAINT fk_solicitacao_servico FOREIGN KEY (servico_id) REFERENCES servicos(id),
    CONSTRAINT fk_solicitacao_cidadao FOREIGN KEY (cidadao_id) REFERENCES usuarios(id),
    CONSTRAINT fk_solicitacao_atendente FOREIGN KEY (atendente_id) REFERENCES usuarios(id)
);