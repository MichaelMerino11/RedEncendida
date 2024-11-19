import React, { useState } from "react";
import "../src/"; // Asegúrate de incluir estilos para el modal

function Modal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
        <button className="modal-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
