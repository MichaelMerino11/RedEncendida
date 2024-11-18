const webpush = require("web-push");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const scheduleRoutes = require("./backend/routes/scheduleRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

webpush.setVapidDetails(
  "mailto:maikijunior9@gmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

app.use(cors());
app.use(bodyParser.json());
app.use("/api/schedules", scheduleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/subscribe", (req, res) => {
  const subscription = req.body; // Recibe la suscripción del frontend

  // Crea el payload de notificación
  const payload = JSON.stringify({
    title: "Aviso de apagón programado",
    body: "Verifica los horarios de apagones en tu región.",
  });

  // Envía la notificación usando la suscripción y el payload
  webpush
    .sendNotification(subscription, payload)
    .then((response) =>
      res.status(200).json({ message: "Notificación enviada" })
    )
    .catch((error) => {
      console.error("Error al enviar la notificación:", error);
      res.status(500).json({ error: "Error al enviar la notificación" });
    });
});
