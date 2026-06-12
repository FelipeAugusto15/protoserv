"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useState } from "react";

type Status = "Pendente" | "Em andamento" | "Concluído";

type Protocolo = {
  id: string;
  solicitante: string;
  servico: string;
  descricao: string;
  data: string;
  status: Status;
};

export default function ProtocolosAtendente() {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);

  const alterarStatus = (id: string, novoStatus: Status) => {
    setProtocolos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: novoStatus } : p
      )
    );
  };

  function getStatusStyle(status: Status) {
    switch (status) {
      case "Pendente":
        return "bg-red-100 text-red-700";
      case "Em andamento":
        return "bg-yellow-100 text-yellow-700";
      case "Concluído":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <main className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">

        <header className="bg-white px-8 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestão de Protocolos
          </h1>
        </header>

        <div className="flex-1 p-8 overflow-auto">

          <div className="grid grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500">Pendentes</h2>
              <p className="text-3xl font-bold text-red-600">
                {protocolos.filter(
                  (p) => p.status === "Pendente"
                ).length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500">Em andamento</h2>
              <p className="text-3xl font-bold text-yellow-600">
                {protocolos.filter(
                  (p) => p.status === "Em andamento"
                ).length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500">Concluídos</h2>
              <p className="text-3xl font-bold text-green-600">
                {protocolos.filter(
                  (p) => p.status === "Concluído"
                ).length}
              </p>
            </div>

          </div>

          <div className="flex flex-col gap-5">

            {protocolos.length === 0 ? (

              <div className="bg-white rounded-xl shadow p-10 text-center">

                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Nenhuma solicitação encontrada
                </h2>

                <p className="text-gray-500">
                  Ainda não existem protocolos cadastrados no sistema.
                </p>

              </div>

            ) : (

              protocolos.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-6"
                >

                  <div className="flex justify-between items-start mb-4">

                    <div>
                      <h2 className="font-bold text-lg text-gray-800">
                        Protocolo #{item.id}
                      </h2>

                      <p className="text-gray-600">
                        {item.servico}
                      </p>

                      <p className="text-sm text-gray-400">
                        {item.data}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-700">
                      Solicitante
                    </p>

                    <p className="text-gray-600">
                      {item.solicitante}
                    </p>
                  </div>

                  <div className="mb-5">
                    <p className="font-semibold text-gray-700">
                      Descrição
                    </p>

                    <p className="text-gray-600">
                      {item.descricao}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">

                    <select
                      value={item.status}
                      onChange={(e) =>
                        alterarStatus(
                          item.id,
                          e.target.value as Status
                        )
                      }
                      className="border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option>Pendente</option>
                      <option>Em andamento</option>
                      <option>Concluído</option>
                    </select>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                      Salvar Alteração
                    </button>

                  </div>

                </div>
              ))

            )}

          </div>

        </div>

        <Footer />
      </div>
    </main>
  );
}