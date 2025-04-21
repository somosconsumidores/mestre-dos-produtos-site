async function enviarPergunta() {
  const pergunta = document.getElementById("question").value.trim();
  const chatBox = document.getElementById("chat-box");

  if (!pergunta) return;

  // Exibe a pergunta do usuário
  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg user-msg";
  userMsg.textContent = pergunta;
  chatBox.appendChild(userMsg);

  // Cria a resposta do bot (inicialmente com loading)
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
    const resposta = data.response || "⚠️ Não foi possível obter resposta.";

    // Verifica se é uma resposta com produtos para comparar
    if (resposta.includes("Score Mestre") && resposta.includes("Preço Médio")) {
      botMsg.innerHTML = `<div>${resposta}</div>` + gerarTabelaHTML(); // Junta texto + tabela
    } else {
      botMsg.textContent = resposta;
    }

  } catch (err) {
    botMsg.textContent = "❌ Erro ao consultar o Mestre. Verifique a conexão com o backend.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Gera a tabela diretamente como string HTML
function gerarTabelaHTML() {
  const produtos = [
    {
      nome: "Smartphone X",
      score: 8.7,
      preco: "1.999",
      selo: "Melhor da Avaliação"
    },
    {
      nome: "Smartphone Y",
      score: 7.9,
      preco: "1.350",
      selo: "Barato da Avaliação"
    },
    {
      nome: "Smartphone Z",
      score: 8.1,
      preco: "1.590",
      selo: "Nossa Recomendação"
    }
  ];

  let html = `
    <div style="margin-top: 10px;">
      <table class="tabela-comparativa">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Score Mestre</th>
            <th>Preço Médio</th>
            <th>Selo</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (const p of produtos) {
    html += `
      <tr>
        <td>${p.nome}</td>
        <td><strong style="color:#15803d">${p.score}</strong></td>
        <td>R$ ${p.preco}</td>
        <td><span class="${getSeloClasse(p.selo)}">${p.selo}</span></td>
      </tr>
    `;
  }

  html += `</tbody></table></div>`;
  return html;
}

// Define classes dos selos
function getSeloClasse(selo) {
  if (selo === "Melhor da Avaliação") return "selo melhor";
  if (selo === "Barato da Avaliação") return "selo barato";
  if (selo === "Nossa Recomendação") return "selo recomendado";
  return "selo";
}
