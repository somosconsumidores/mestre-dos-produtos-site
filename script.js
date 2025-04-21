async function enviarPergunta() {
  const pergunta = document.getElementById("question").value.trim();
  const chatBox = document.getElementById("chat-box");
  if (!pergunta) return;

  // Adiciona mensagem do usuário no chat
  chatBox.innerHTML += `
    <div class="text-right">
      <div class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-xl max-w-lg text-sm">
        ${pergunta}
      </div>
    </div>
  `;

  // Loading do bot
  const id = `resposta-${Date.now()}`;
  chatBox.innerHTML += `
    <div id="${id}" class="text-left">
      <div class="inline-block bg-gray-100 px-4 py-2 rounded-xl text-sm max-w-lg text-gray-700 animate-pulse">
        ⏳ Consultando o Mestre dos Produtos...
      </div>
    </div>
  `;

  // Limpa o campo
  document.getElementById("question").value = "";

  try {
    const res = await fetch("https://mestre-dos-produtos-api.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: pergunta })
    });

    const data = await res.json();
    const resposta = data.response || "⚠️ O Mestre não conseguiu responder.";

    // 👉 Aqui está a parte essencial: renderiza HTML com formatação
    document.getElementById(id).innerHTML = `
      <div class="inline-block bg-white border border-gray-200 p-4 rounded-xl text-sm max-w-lg shadow leading-relaxed">
        ${resposta}
      </div>
    `;
  } catch (err) {
    document.getElementById(id).innerHTML = `
      <div class="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-xl text-sm max-w-lg">
        ❌ Erro ao consultar o Mestre. Verifique sua conexão.
      </div>
    `;
  }

  // Rola para o final do chat automaticamente
  chatBox.scrollTop = chatBox.scrollHeight;
}
