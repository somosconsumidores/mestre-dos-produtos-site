async function enviarPergunta() {
  const pergunta = document.getElementById("question").value;
  const respostaDiv = document.getElementById("resposta");

  respostaDiv.textContent = "Consultando o Mestre dos Produtos...";

  try {
    const response = await fetch("https://mestre-dos-produtos-api.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: pergunta })
    });

    const data = await response.json();
    respostaDiv.textContent = data.response;
  } catch (err) {
    respostaDiv.textContent = "Erro ao consultar o Mestre. Verifique a conexão com o backend.";
  }
}
