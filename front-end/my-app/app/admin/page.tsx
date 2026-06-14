"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  status: string;
};

type Servico = {
  id: number;
  nome: string;
  descricao: string;
};

export default function DashboardAdmin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const token = localStorage.getItem("token");

      const [usuariosRes, servicosRes] = await Promise.all([
        fetch("http://localhost:8080/usuarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:8080/servicos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const usuariosData = await usuariosRes.json();
      const servicosData = await servicosRes.json();

      setUsuarios(usuariosData.content || []);
      setServicos(servicosData.content || []);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setLoading(false);
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

          <div className="grid grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Usuários</h3>
              <p className="text-3xl font-bold text-blue-600">
                {usuarios.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Serviços</h3>
              <p className="text-3xl font-bold text-green-600">
                {servicos.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">Sistema</h3>
              <p className="text-xl font-bold text-gray-700">
                Online
              </p>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden mb-8">

            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">
                Usuários Cadastrados
              </h2>
            </div>

            {loading ? (
              <div className="p-6">
                Carregando usuários...
              </div>
            ) : (
              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Nome</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Perfil</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="border-t"
                    >
                      <td className="p-4">{usuario.id}</td>
                      <td className="p-4">{usuario.nome}</td>
                      <td className="p-4">{usuario.email}</td>
                      <td className="p-4">{usuario.perfil}</td>
                      <td className="p-4">{usuario.status}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">
                Serviços Disponíveis
              </h2>
            </div>

            {loading ? (
              <div className="p-6">
                Carregando serviços...
              </div>
            ) : (
              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Nome</th>
                    <th className="p-4 text-left">Descrição</th>
                  </tr>
                </thead>

                <tbody>
                  {servicos.map((servico) => (
                    <tr
                      key={servico.id}
                      className="border-t"
                    >
                      <td className="p-4">{servico.id}</td>
                      <td className="p-4">{servico.nome}</td>
                      <td className="p-4">{servico.descricao}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>

        </div>

        <Footer />
      </div>
    </main>
  );
}