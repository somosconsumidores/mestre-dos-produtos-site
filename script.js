const historicoChat = [
  {
    role: "system",
    content: `Você é o Mestre dos Produtos, especialista em testes e comparações de produtos.
Sempre mantenha o foco no produto citado inicialmente pelo usuário.
Responda com tabelas, selos, Score Mestre e links reais de compra sempre que possível.`
  }
];

async function enviarPergunta() {
  const pergunta = document.getElementById("question").value.trim();
  const chatBox = document.getElementById("chat-box");
  if (!pergunta) return;

  // Exibe a pergunta do usuário
  chatBox.innerHTML += `
    <div class="text-right">
      <div class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-xl max-w-lg text-sm">
        ${pergunta}
      </div>
    </div>
  `;

  historicoChat.push({ role: "user", content: pergunta });

  // Exibe loading
  const id = `resposta-${Date.now()}`;
  chatBox.innerHTML += `
    <div id="${id}" class="text-left">
      <div class="inline-block bg-gray-100 px-4 py-2 rounded-xl text-sm max-w-lg text-gray-700 animate-pulse">
        ⏳ Consultando o Mestre dos Produtos...
      </div>
    </div>
  `;

  document.getElementById("question").value = "";

  try {
    const res = await fetch("https://mestre-dos-produtos-api.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: historicoChat })
    });

    const data = await res.json();
    const resposta = data.response || "⚠️ O Mestre não conseguiu responder.";

    document.getElementById(id).innerHTML = `
      <div class="inline-block bg-white border border-gray-200 p-4 rounded-xl text-sm max-w-lg shadow leading-relaxed">
        ${resposta}
      </div>
    `;

    historicoChat.push({ role: "assistant", content: resposta });
  } catch (err) {
    document.getElementById(id).innerHTML = `
      <div class="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-xl text-sm max-w-lg">
        ❌ Erro ao consultar o Mestre. Verifique sua conexão.
      </div>
    `;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
