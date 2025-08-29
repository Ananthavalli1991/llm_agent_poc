const chatWindow = document.getElementById("chat-window");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const alertContainer = document.getElementById("alert-container");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "text-end text-primary mb-2" : "text-start text-dark mb-2";
  msg.innerText = `${sender === "user" ? "You" : "Agent"}: ${text}`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showError(err) {
  alertContainer.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      ${err}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    addMessage("agent", data.reply || "No reply");
  } catch (err) {
    showError(err.message);
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
