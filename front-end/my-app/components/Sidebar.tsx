"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "📊" },
  { href: "/servicos", label: "Serviços", icon: "⚙️", badge: "" },
  { href: "/protocolos", label: "Protocolos", icon: "📋" },
  { href: "/perfil", label: "Perfil", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [usuario, setUsuario] = useState({
    nome: "Carregando...",
    perfil: "..."
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    async function carregarUsuario() {
      try {
        const response = await fetch("http://localhost:8080/usuarios/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        setUsuario({
          nome: data.nome,
          perfil: data.perfil || "Usuário"
        });

      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      }
    }

    carregarUsuario();
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <aside className="relative w-64 flex flex-col p-7 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #13131f 0%, #0d0d1a 100%)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        minHeight: "100vh",
      }}
    >

      {/* NAV */}
      <p className="text-[10px] font-medium tracking-[1.5px] uppercase text-white/25 px-2 mb-2">
        Menu
      </p>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon, badge }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-[11px] rounded-xl text-sm"
              style={{
                color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                background: isActive
                  ? "rgba(99,102,241,0.2)"
                  : "transparent"
              }}
            >
              <span>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* USER INFO DINÂMICO */}
      <div className="mt-auto pt-5 border-t border-white/10">

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
          <div>
            <p className="text-white text-sm font-medium">
              {usuario.nome}
            </p>
            <p className="text-white/40 text-xs">
              {usuario.perfil}
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="w-full mt-3 py-2 rounded-xl text-sm bg-red-500/10 text-red-400 border border-red-500/20"
        >
          ⎋ Sair da conta
        </button>

      </div>
    </aside>
  );
}