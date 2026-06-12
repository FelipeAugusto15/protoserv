"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

//  Tipos prontos
type Status = "Em andamento" | "Concluído" | "Pendente";

type Protocolo = {
  id: string;
  servico: string;
  data: string;
  status: Status;
};

export default function Protocolos() {

  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      //  Pode testar com dados depois
      setProtocolos([]);
      setLoading(false);
    }, 1500);
  }, []);

  //  CORES DOS STATUS
  function getStatusStyle(status: Status): string {
    switch (status) {
      case "Em andamento":
        return "bg-yellow-100 text-yellow-700";
      case "Concluído":
        return "bg-green-100 text-green-700";
      case "Pendente":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <main className="flex h-screen bg-gray-900">
      
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100">
        
        {/* HEADER */}
        <header className="bg-white px-8 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Meus Protocolos
          </h1>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 flex items-center justify-center p-8">
          
          {loading ? (
            <p className="text-gray-600 animate-pulse">
              Carregando protocolos...
            </p>

          ) : protocolos.length === 0 ? (
            
            <div className="text-center max-w-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Nenhum protocolo encontrado
              </h2>

              <p className="text-gray-600 mb-6">
                Você ainda não realizou nenhuma solicitação de serviço.
              </p>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Solicitar Serviço
              </button>
            </div>

          ) : (
            
            <div className="flex flex-col gap-4 w-full max-w-4xl">
              
              {protocolos.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
                >
                  
                  {/* INFO */}
                  <div>
                    <h2 className="font-bold text-gray-800">
                      Protocolo #{item.id}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {item.servico}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {item.data}
                    </p>
                  </div>

                  {/* STATUS COLORIDO */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}
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