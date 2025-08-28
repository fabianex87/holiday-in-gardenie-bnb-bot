const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// 🔑 Metti qui il tuo token e ID presi da Meta
const TOKEN = process.env.ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

// ✅ Ricezione messaggi
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;
    const message = data.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (message) {
      const from = message.from;
      const text = message.text?.body?.toLowerCase();

      let reply = "Ciao 👋! Scrivi 'stanza' per i prezzi o 'indirizzo' per la posizione.";

      if (text.includes("stanza") || text.includes("room") || text.includes("cuarto")) {
        reply = "🏠 La stanza costa 60€ a notte con colazione inclusa 🍳. Vuoi prenotare?";
      } else if (text.includes("indirizzo")) {
        reply = "📍 Ci trovi a Roma, zona Centocelle.";
      }

      await axios.post(
        `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
        { messaging_product: "whatsapp", to: from, text: { body: reply } },
        { headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" } }
      );
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Errore webhook:", err.message);
    res.sendStatus(500);
  }
});

// ✅ Verifica webhook con Meta
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// app.listen(3000, () => console.log("✅ Bot in ascolto su http://localhost:3000"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Bot in ascolto sulla porta ${PORT}`));

