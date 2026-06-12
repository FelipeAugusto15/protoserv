"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

type Servico = {
  id: number;
  nome: string;
  descricao: string;
  icone: string;
};

type Estatisticas = {
  total: number;
  resolvidas: number;
  tempoMedio: string;
};

export default function Servicos() {
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
  const [busca, setBusca] = useState("");

  const [stats] = useState<Estatisticas | null>(null);

  const servicos: Servico[] = [
    { id: 1, nome: "Iluminação Pública", descricao: "Postes ou lâmpadas apagadas", icone: "💡" },
    { id: 2, nome: "Coleta de Lixo", descricao: "Acúmulo ou falta de coleta", icone: "🗑️" },
    { id: 3, nome: "Infraestrutura", descricao: "Buracos, ruas e calçadas", icone: "🚧" },
    { id: 4, nome: "Limpeza Urbana", descricao: "Entulhos e terrenos sujos", icone: "🧹" },
    { id: 5, nome: "Vazamento de Água", descricao: "Problemas na rede", icone: "💧" },
    { id: 6, nome: "Outros", descricao: "Outras solicitações", icone: "📌" },
  ];

  const servicosFiltrados = servicos.filter((s) =>
    s.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">

        <header className="bg-white px-8 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Solicitar Serviço
          </h1>
        </header>

        <div className="flex-1 p-8 overflow-auto">

          {!servicoSelecionado && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Escolha o tipo de serviço
              </h2>

              <p className="text-gray-700 mb-6">
                Selecione rapidamente o serviço desejado para abrir um protocolo.
              </p>

              <input
                type="text"
                placeholder="Buscar serviço..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <div className="grid grid-cols-3 gap-5">
                {servicosFiltrados.map((servico) => (
                  <div
                    key={servico.id}
                    onClick={() => setServicoSelecionado(servico)}
                    className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md hover:border-blue-400"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-xl">
                      {servico.icone}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {servico.nome}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {servico.descricao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {servicoSelecionado && (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

              <button
                onClick={() => setServicoSelecionado(null)}
                className="text-sm text-blue-600 mb-4 hover:underline"
              >
                ← Voltar
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {servicoSelecionado.nome}
              </h3>

              <p className="text-gray-700 mb-6">
                {servicoSelecionado.descricao}
              </p>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();

                  const form = e.currentTarget;

                  const payload = {
                    servicoId: servicoSelecionado.id,
                    servico: servicoSelecionado.nome,
                    nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
                    email: (form.elements.namedItem("email") as HTMLInputElement).value,
                    telefone: (form.elements.namedItem("telefone") as HTMLInputElement).value,
                    endereco: (form.elements.namedItem("endereco") as HTMLInputElement).value,
                    titulo: (form.elements.namedItem("titulo") as HTMLInputElement).value,
                    descricao: (form.elements.namedItem("descricao") as HTMLTextAreaElement).value,
                  };

                  console.log("ENVIAR PARA BACKEND:", payload);

                  // FUTURO: POST /solicitacoes
                  alert("Solicitação enviada!");
                }}
              >
                <h4 className="font-semibold text-gray-900 mt-2">
                  Dados do solicitante
                </h4>

                <input name="nome" type="text" placeholder="Nome completo" className="border p-3 rounded-lg" required />
                <input name="email" type="email" placeholder="Email para contato" className="border p-3 rounded-lg" />
                <input name="telefone" type="tel" placeholder="Telefone para contato" className="border p-3 rounded-lg" required />
                <input name="endereco" type="text" placeholder="Endereço do problema" className="border p-3 rounded-lg" required />

                <h4 className="font-semibold text-gray-900 mt-4">
                  Detalhes da solicitação
                </h4>

                <input name="titulo" type="text" placeholder="Título do problema" className="border p-3 rounded-lg" required />
                <textarea name="descricao" placeholder="Descreva o problema..." className="border p-3 rounded-lg h-28" required />

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mt-2"
                >
                  Enviar Solicitação
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}