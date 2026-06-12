"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useMemo, useState } from "react";

type Status = "Pendente" | "Em andamento" | "Concluído";

type Protocolo = {
  id: string;
  solicitante: string;
  servico: string;
  data: string;
  status: Status;
};

export default function DashboardAdmin() {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);

  const alterarStatus = (id: string, novoStatus: Status) => {
    setProtocolos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: novoStatus } : p
      )
    );
  };

  const protocolosFiltrados = useMemo(() => {
    return protocolos.filter((p) => {
      const matchBusca =
        p.id.includes(busca) ||
        p.servico.toLowerCase().includes(busca.toLowerCase()) ||
        p.solicitante.toLowerCase().includes(busca.toLowerCase());

      const matchStatus =
        filtroStatus === "Todos" ||
        p.status === filtroStatus;

      return matchBusca && matchStatus;
    });
  }, [protocolos, busca, filtroStatus]);

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
            Painel Administrativo
          </h1>
        </header>

        <div className="flex-1 p-8 overflow-auto">

          {/* CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Total</h3>
              <p className="text-3xl font-bold text-blue-600">
                {protocolos.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Pendentes</h3>
              <p className="text-3xl font-bold text-red-600">
                {protocolos.filter((p) => p.status === "Pendente").length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Em andamento</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {protocolos.filter((p) => p.status === "Em andamento").length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Concluídos</h3>
              <p className="text-3xl font-bold text-green-600">
                {protocolos.filter((p) => p.status === "Concluído").length}
              </p>
            </div>

          </div>

          {/* FILTROS */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Buscar protocolo, serviço ou cidadão..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
              />

              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option>Todos</option>
                <option>Pendente</option>
                <option>Em andamento</option>
                <option>Concluído</option>
              </select>

            </div>

          </div>

          {/* TABELA */}
          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Protocolo</th>
                  <th className="text-left p-4">Solicitante</th>
                  <th className="text-left p-4">Serviço</th>
                  <th className="text-left p-4">Data</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Ações</th>
                </tr>
              </thead>

              <tbody>

                {protocolosFiltrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center p-10 text-gray-500"
                    >
                      Nenhuma solicitação encontrada.
                    </td>
                  </tr>
                ) : (
                  protocolosFiltrados.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-semibold">
                        #{item.id}
                      </td>

                      <td className="p-4">
                        {item.solicitante}
                      </td>

                      <td className="p-4">
                        {item.servico}
                      </td>

                      <td className="p-4">
                        {item.data}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          <select
                            value={item.status}
                            onChange={(e) =>
                              alterarStatus(
                                item.id,
                                e.target.value as Status
                              )
                            }
                            className="border border-gray-300 rounded px-3 py-1"
                          >
                            <option>Pendente</option>
                            <option>Em andamento</option>
                            <option>Concluído</option>
                          </select>

                          <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                            Salvar
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

        <Footer />
      </div>
    </main>
  );
}