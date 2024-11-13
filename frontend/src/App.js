import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [region, setRegion] = useState("");
  const [schedules, setSchedules] = useState([]);
  const PUBLIC_VAPID_KEY =
    "BNZ0foZbO2tcW6LkSc18DzTQkWxR86LDRIGw_8ONp9f7dd7mOiU1pvMuT8sgShSXvjcyMBwPwVLVoF6NYNNpo3A";

  const subscribeToNotifications = async () => {
    // Verifica si el Service Worker y las notificaciones están soportadas en el navegador
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const registration = await navigator.serviceWorker.register("/sw.js");

      // Solicita permiso de notificaciones al usuario
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });

      // Envía la suscripción al backend
      await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  const fetchSchedules = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/schedules/${region}`
    );
    setSchedules(response.data);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    if (region) {
      fetchSchedules();
    }
  }, [region]);

  return (
    <div>
      <h1>Horarios de Apagones</h1>
      <input
        type="text"
        placeholder="Ingrese su región"
        value={region}
        onChange={handleRegionChange}
      />
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            <strong>{schedule.region}</strong>:{" "}
            {new Date(schedule.start_time).toLocaleString()} -{" "}
            {new Date(schedule.end_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

useEffect(() => {
  subscribeToNotifications();
}, []);

export default App;
