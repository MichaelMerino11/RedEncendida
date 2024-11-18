import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function App() {
  const [region, setRegion] = useState("");
  const [schedules, setSchedules] = useState([]);
  const PUBLIC_VAPID_KEY =
    "BNZ0foZbO2tcW6LkSc18DzTQkWxR86LDRIGw_8ONp9f7dd7mOiU1pvMuT8sgShSXvjcyMBwPwVLVoF6NYNNpo3A";

  // Convierte la clave VAPID a un Uint8Array
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // Función para suscribirse a notificaciones
  const subscribeToNotifications = useCallback(async () => {
    try {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const registration = await navigator.serviceWorker.register("/sw.js");
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
        });

        await fetch("http://localhost:5000/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Suscripción exitosa:", subscription);
      } else {
        console.error(
          "El navegador no soporta Service Workers o PushManager."
        );
      }
    } catch (error) {
      console.error("Error al suscribirse a notificaciones:", error);
    }
  }, []);

  // Función para obtener los horarios según la región
  const fetchSchedules = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/schedules/${region}`
      );
      setSchedules(response.data);
    } catch (error) {
      console.error("Error al obtener los horarios:", error);
    }
  }, [region]);

  // Maneja el cambio de región
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  // Efecto para suscribirse a notificaciones
  useEffect(() => {
    subscribeToNotifications();
  }, [subscribeToNotifications]);

  // Efecto para obtener los horarios cuando cambia la región
  useEffect(() => {
    if (region) {
      fetchSchedules();
    }
  }, [region, fetchSchedules]);

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

export default App;
