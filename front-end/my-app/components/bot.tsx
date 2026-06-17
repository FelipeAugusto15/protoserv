"use client";

import { useState } from "react";

export default function Bot() {
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState<{ autor: string; texto: string }[]>([
    { autor: "bot", texto: "Olá! 👋 Como posso te ajudar?" },
  ]);

  function responder(texto: string) {
    texto = texto.toLowerCase();

    if (texto.includes("oi") || texto.includes("olá") || texto.includes("ola")) return "Olá! 👋 Como posso te ajudar?";
    if (texto.includes("bom dia")) return "Bom dia! ☀️ Em que posso ajudar?";
    if (texto.includes("boa tarde")) return "Boa tarde! 😊 Precisa de ajuda com algo?";
    if (texto.includes("boa noite")) return "Boa noite! 🌙 Como posso ajudar você?";
    if (texto.includes("obrigado") || texto.includes("valeu")) return "De nada! 😄 Se precisar, estou aqui.";
    if (texto.includes("ajuda") || texto.includes("socorro")) return "Claro! Me diga qual problema você está enfrentando.";
    if (texto.includes("abrir protocolo") || texto.includes("criar protocolo")) return "Para abrir um protocolo, vá na opção 'Abrir Protocolo'.";
    if (texto.includes("novo protocolo")) return "Você pode criar um novo protocolo clicando em 'Abrir Protocolo' no painel.";
    if (texto.includes("não consigo abrir protocolo")) return "Verifique se todos os campos estão preenchidos corretamente antes de enviar.";
    if (texto.includes("erro ao abrir protocolo")) return "Tente atualizar a página ou verificar sua conexão.";
    if (texto.includes("acompanhar protocolo") || texto.includes("ver protocolo")) return "Você pode acompanhar seu protocolo na aba 'Acompanhar'.";
    if (texto.includes("status do protocolo")) return "Acesse a aba 'Acompanhar' para ver o status.";
    if (texto.includes("protocolo não aparece")) return "Verifique se o protocolo foi enviado corretamente.";
    if (texto.includes("protocolo")) return "Você pode abrir ou acompanhar um protocolo pelo painel principal.";
    if (texto.includes("serviço") || texto.includes("servicos")) return "Na aba 'Serviços' você encontra todos os serviços disponíveis.";
    if (texto.includes("tipos de serviço")) return "Os principais serviços são: Iluminação, Coleta e Infraestrutura.";
    if (texto.includes("iluminação")) return "Problemas com iluminação podem ser registrados como protocolo.";
    if (texto.includes("coleta")) return "Problemas com coleta podem ser informados abrindo um protocolo.";
    if (texto.includes("infraestrutura")) return "Problemas de infraestrutura podem ser reportados no sistema.";
    if (texto.includes("perfil") || texto.includes("minha conta")) return "Você pode acessar seus dados na aba 'Perfil'.";
    if (texto.includes("alterar dados")) return "Acesse a aba 'Perfil' para atualizar suas informações.";
    if (texto.includes("login")) return "Se tiver problemas com login, tente redefinir sua senha.";
    if (texto.includes("senha")) return "Você pode redefinir sua senha na tela de login.";
    if (texto.includes("não consigo entrar")) return "Verifique seu login e senha ou tente redefinir sua senha.";
    if (texto.includes("sair")) return "Para sair, clique no botão 'Sair' no menu lateral.";
    if (texto.includes("erro")) return "Ocorreu um erro? Tente atualizar a página.";
    if (texto.includes("bug")) return "Obrigado por avisar! Tente recarregar a página.";
    if (texto.includes("travou")) return "Se o sistema travou, tente atualizar a página.";
    if (texto.includes("home")) return "Você pode voltar para a tela inicial clicando em 'Home'.";
    if (texto.includes("menu")) return "Use o menu lateral para navegar entre as opções.";
    if (texto.includes("demora") || texto.includes("tempo")) return "O tempo de resposta pode variar dependendo do serviço.";
    if (texto.includes("falar com atendente")) return "No momento, o atendimento é feito por este assistente.";
    if (texto.includes("suporte")) return "Você já está no suporte! 😄 Como posso ajudar?";
    if (texto.includes("tchau") || texto.includes("até mais")) return "Até mais! 👋 Qualquer coisa, estou por aqui.";
    if (texto.includes("abrir")) return "Para abrir um protocolo, clique em 'Abrir Protocolo' no painel.";
    return "Desculpe, não entendi 🤔. Pode reformular ou ser mais específico?";
  }

  function enviarMensagem(textoCustom?: string) {
    const textoFinal = textoCustom || mensagem;
    if (!textoFinal.trim()) return;
    setChat((prev) => [
      ...prev,
      { autor: "user", texto: textoFinal },
      { autor: "bot", texto: responder(textoFinal) },
    ]);
    setMensagem("");
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-md">

      <h3 className="text-base font-bold text-gray-800 mb-3">Suporte Online</h3>

      {/* CHAT */}
      <div className="h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 mb-3 bg-gray-50">
        {chat.map((msg, index) => (
          <div key={index} className={`mb-2 flex ${msg.autor === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
              msg.autor === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}>
              {msg.texto}
            </div>
          </div>
        ))}
      </div>

      {/* SUGESTÕES */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button onClick={() => enviarMensagem("abrir protocolo")} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition">
          Abrir protocolo
        </button>
        <button onClick={() => enviarMensagem("acompanhar protocolo")} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition">
          Acompanhar
        </button>
        <button onClick={() => enviarMensagem("ajuda")} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition">
          Ajuda
        </button>
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") enviarMensagem(); }}
          placeholder="Digite sua mensagem..."
          className="flex-1 border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={() => enviarMensagem()}
          className="bg-blue-600 text-white px-4 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}