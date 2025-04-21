const backendUrl = "https://mestre-dos-produtos-api.onrender.com/chat";

async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const message = input.value.trim();
  if (!message) return;

  // Adiciona a mensagem do usuário no chat
  chat.innerHTML += `<div class="message user">Você: ${message}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    const reply = data.reply || "Erro: nenhuma resposta recebida.";
    
    // Adiciona a resposta do assistente no chat
    chat.innerHTML += `<div class="message bot">Assistente: ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<div class="message bot">Erro de rede: ${err.message}</div>`;
  }
}
