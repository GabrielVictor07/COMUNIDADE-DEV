const http = require("http");

async function simulateWebhook(userId) {
  const payload = JSON.stringify({
    event: "PAYMENT_CONFIRMED",
    payment: {
      id: "pay_test_123456",
      value: 29.90,
      externalReference: userId
    }
  });

  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/api/webhooks/asaas",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "asaas-access-token": process.env.ASAAS_WEBHOOK_SECRET || "whsec_j044cKvPk7WzSHW9UP9nT3pmpAk5WAWLSKNzqQ5rLNQ"
    }
  };

  const req = http.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => data += chunk);
    res.on("end", () => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Resposta: ${data}`);
    });
  });

  req.on("error", (e) => {
    console.error(`Erro: ${e.message}`);
  });

  req.write(payload);
  req.end();
}

// Pega o userId passado no terminal
const userId = process.argv[2];
if (!userId) {
  console.log("Por favor, passe o ID do usuário. Ex: node simulate-webhook.js <user_id>");
  process.exit(1);
}

simulateWebhook(userId);
