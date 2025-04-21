async function enviarPergunta() {
  const pergunta = document.getElementById("question").value.trim();
  if (!pergunta) return;

  const chatBox = document.getElementById("chat-box");

  // Exibir pergunta do usuário
  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.textContent = pergunta;
  chatBox.appendChild(userDiv);

  // Limpar o campo de texto
  document.getElementById("question").value = "";

  // Exibir mensagem de carregamento
  const respostaDiv = document.createElement("div");
  respostaDiv.className = "bot-message";
  respostaDiv.textContent = "Carregando resposta...";
  chatBox.appendChild(respostaDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://mestre-dos-produtos-api.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta }),
    });

    const data = await response.json();

    respostaDiv.textContent = data.resposta;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    respostaDiv.textContent = "Erro ao buscar resposta. Tente novamente.";
  }
}
