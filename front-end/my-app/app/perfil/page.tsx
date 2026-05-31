"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const router = useRouter();

  const [editando, setEditando] = useState(false);

  const [usuario, setUsuario] = useState({
    nome: "",
    email: ""
  });

  const [backup, setBackup] = useState(usuario);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    async function carregar() {
      try {
        const res = await fetch("http://localhost:8080/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        setUsuario({
          nome: data.nome,
          email: data.email
        });

        setBackup({
          nome: data.nome,
          email: data.email
        });

      } catch (err) {
        router.push("/login");
      }
    }

    carregar();
  }, [router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUsuario((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function cancelar() {
    setUsuario(backup);
    setEditando(false);
  }

  async function salvar() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/usuarios/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(usuario)
      });

      if (!res.ok) {
        alert("Erro ao salvar");
        return;
      }

      setBackup(usuario);
      setEditando(false);

      alert("Perfil atualizado!");

    } catch (err) {
      alert("Erro ao salvar perfil");
    }
  }

  return (
    <main className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 bg-gray-100 flex justify-center items-center p-8">

        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">

          {/* AVATAR (SÓ LETRA) */}
          <div className="flex items-center gap-5 mb-6">

            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : "U"}
            </div>

            <div>
              <p className="font-semibold text-lg">
                {usuario.nome || "Usuário"}
              </p>
              <p className="text-sm text-gray-500">
                {editando ? "Editando perfil" : "Visualização do perfil"}
              </p>
            </div>

          </div>

          {/* INPUTS */}
          <div className="space-y-4">

            <input
              name="nome"
              value={usuario.nome}
              onChange={handleChange}
              disabled={!editando}
              className="w-full border p-2 rounded"
            />

            <input
              name="email"
              value={usuario.email}
              onChange={handleChange}
              disabled={!editando}
              className="w-full border p-2 rounded"
            />

          </div>

          {/* BOTÕES */}
          <div className="flex justify-end gap-3 mt-6">

            {editando && (
              <button
                onClick={cancelar}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
            )}

            <button
              onClick={() => (editando ? salvar() : setEditando(true))}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {editando ? "Salvar" : "Editar"}
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}