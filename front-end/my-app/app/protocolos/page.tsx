"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

type Protocolo = {
  id: number;
  protocolo: string;
  servicoNome: string;
  status: string;
  dataAbertura: string;
};

export default function Protocolos() {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarProtocolos();
  }, []);

  async function carregarProtocolos() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/solicitacoes/minhas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar protocolos");
      }

      const data = await response.json();

      setProtocolos(data.content || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case "NOVO":
        return "bg-red-100 text-red-700";

      case "EM_ANDAMENTO":
        return "bg-yellow-100 text-yellow-700";

      case "CONCLUIDA":
        return "bg-green-100 text-green-700";

      case "CANCELADA":
        return "bg-gray-100 text-gray-700";

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
            Meus Protocolos
          </h1>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          {loading ? (
            <p className="text-center text-gray-600">
              Carregando protocolos...
            </p>
          ) : protocolos.length === 0 ? (
            <div className="bg-white p-10 rounded-xl shadow text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum protocolo encontrado
              </h2>

              <p className="text-gray-500">
                Você ainda não realizou nenhuma solicitação.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {protocolos.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-bold text-gray-800">
                      {item.protocolo}
                    </h2>

                    <p className="text-gray-600">
                      {item.servicoNome}
                    </p>

                    <p className="text-sm text-gray-400">
                      {new Date(
                        item.dataAbertura
                      ).toLocaleDateString("pt-BR")}
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
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}