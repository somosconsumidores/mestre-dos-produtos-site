async function enviarPergunta() {
  const pergunta = document.getElementById("question").value.trim();
  const chatBox = document.getElementById("chat-box");

  if (!pergunta) return;

  // Exibe a pergunta do usuário
  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg user-msg";
  userMsg.textContent = pergunta;
  chatBox.appendChild(userMsg);

  // Exibe loading
  const botMsg = document.createElement("div");
  botMsg.className = "chat-msg bot-msg";
  botMsg.textContent = "⏳ Consultando o Mestre dos Produtos...";
  chatBox.appendChild(botMsg);

  document.getElementById("question").value = "";

  try {
    const response = await fetch("https://mestre-dos-produtos-api.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: pergunta })
    });

    const data = await response.json();
    botMsg.textContent = data.response || "⚠️ Não foi possível obter resposta.";
  } catch (err) {
    botMsg.textContent = "❌ Erro ao consultar o Mestre. Verifique a conexão com o backend.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
