async function enviarPergunta() {
  const pergunta = document.getElementById("question").value.trim();
  const imagem = document.getElementById("imagemInput").files[0];
  const chatBox = document.getElementById("chat-box");

  if (!pergunta && !imagem) return;

  // Exibe a pergunta do usuário (se houver)
  if (pergunta) {
    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg user-msg";
    userMsg.textContent = pergunta;
    chatBox.appendChild(userMsg);
  }

  // Exibe loading
  const botMsg = document.createElement("div");
  botMsg.className = "chat-msg bot-msg";
  botMsg.textContent = "⏳ Consultando o Assistente Consumo Inteligente...";
  chatBox.appendChild(botMsg);

  // Limpa campos
  document.getElementById("question").value = "";
  document.getElementById("imagemInput").value = "";

  try {
    let response;
    
    if (imagem) {
      // Envia imagem (com ou sem pergunta)
      const formData = new FormData();
      if (pergunta) formData.append("question", pergunta);
      formData.append("image", imagem);

      response = await fetch("https://mestre-dos-produtos-api.onrender.com/upload", {
        method: "POST",
        body: formData
      });

    } else {
      // Envia apenas texto
      response = await fetch("https://mestre-dos-produtos-api.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: pergunta })
      });
    }

    const data = await response.json();
    botMsg.textContent = data.response || "⚠️ Não foi possível obter resposta.";
  } catch (err) {
    botMsg.textContent = "❌ Erro ao consultar o Assistente. Verifique a conexão com o backend.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
