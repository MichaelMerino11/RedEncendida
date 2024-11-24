import React, { useState, useEffect } from "react";
import "./Modal.css";

function App() {
  const [region, setRegion] = useState("");
  const [filteredSubstations, setFilteredSubstations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubstation, setSelectedSubstation] = useState("");
  const [horarios, setHorarios] = useState({});
  const [newHorario, setNewHorario] = useState("");

  const uniqueSubstations = Array.from(
    new Set([
      "miraflores",
      "el bosque",
      "andalucía",
      "conocoto",
      "cumbayá",
      "eugenio espejo",
      "luluncoto",
      "la floresta",
      "epiclachima",
      "nueva cumbayá",
      "la carolina",
      "tababela",
      "los bancos",
      "pérez guerrero",
      "el obraje (machachi)",
      "chimbacalle belisario quevedo",
      "iñaquito",
      "inga bajo",
      "chilibulo",
      "granda centeno",
      "rio coca",
      "gualo",
      "sangolqui",
      "barrionuevo",
      "santa rosa",
      "el quinche",
      "olímpico",
      "cristianía",
      "san antonio",
      "alangasí",
      "san rafael",
      "tumbaco",
      "pomasqui",
      "san roque",
      "cotocollao",
      "sector industrial (santa rosa, inga bajo, sangolqui)",
      "escuela sucre",
      "la marin",
      "diez vieja",
      "san pablo",
      "diez nueva",
      "aereopuerto",
      "batán alto",
    ])
  );

  const fetchSchedules = (region) => {
    const scheduleMapping = {
      miraflores: ["00:00-04:00", "12:00-16:00"],
      "el bosque": ["00:00-04:00", "12:00-16:00"],
      andalucía: ["00:00-04:00", "12:00-16:00"],
      conocoto: ["00:00-04:00", "12:00-16:00"],
      cumbayá: ["00:00-04:00", "12:00-16:00"],
      "eugenio espejo": ["00:00-04:00", "12:00-16:00"],
      luluncoto: ["08:00-12:00", "20:00-24:00"],
      "la floresta": ["08:00-12:00", "20:00-24:00"],
      epiclachima: ["08:00-12:00", "20:00-24:00"],
      "nueva cumbayá": ["08:00-12:00", "20:00-24:00"],
      "la carolina": ["02:00-06:00", "19:00-23:00"],
      tababela: ["02:00-06:00", "19:00-23:00"],
      "los bancos": ["02:00-06:00", "19:00-23:00"],
      "pérez guerrero": ["02:00-06:00", "19:00-23:00"],
      "el obraje (machachi)": ["02:00-06:00", "19:00-23:00"],
      chimbacalle: ["08:00-12:00", "20:00-24:00"],
      "belisario quevedo": ["08:00-12:00", "20:00-24:00"],
      iñaquito: ["08:00-12:00", "20:00-24:00"],
      "inga bajo": ["08:00-12:00", "20:00-24:00"],
      chilibulo: ["07:00-11:00", "20:00-24:00"],
      "granda centeno": ["07:00-11:00", "20:00-24:00"],
      "río coca": ["07:00-11:00", "20:00-24:00"],
      gualo: ["04:00-08:00", "16:00-20:00"],
      sangolquí: ["04:00-08:00", "16:00-20:00"],
      barrionuevo: ["02:00-06:00", "14:00-18:00"],
      "santa rosa": ["02:00-06:00", "14:00-18:00"],
      "el quinche": ["02:00-06:00", "14:00-18:00"],
      olímpico: ["10:00-14:00", "20:00-24:00"],
      cristianía: ["10:00-14:00", "20:00-24:00"],
      "san antonio": ["10:00-14:00", "20:00-24:00"],
      alangasí: ["10:00-14:00", "20:00-24:00"],
      "san rafael": ["06:00-10:00", "16:00-20:00"],
      tumbaco: ["06:00-10:00", "16:00-20:00"],
      pomasqui: ["06:00-10:00", "16:00-20:00"],
      "san roque": ["00:00-04:00", "15:00-19:00"],
      "inga bajo 1": ["00:00-04:00", "15:00-19:00"],
      "sector industrial": ["17:00-24:00"],
      "escuela sucre": ["11:00-15:00", "20:00-24:00"],
      "la marin": ["11:00-15:00", "20:00-24:00"],
      "diez vieja": ["11:00-15:00", "20:00-24:00"],
      "san pablo": ["11:00-15:00", "20:00-24:00"],
      "diez nueva": ["11:00-15:00", "20:00-24:00"],
      aereopuerto: ["12:00-16:00", "20:00-24:00"],
      "batán alto": ["12:00-16:00", "20:00-24:00"],
    };

    const mappedSchedules = scheduleMapping[region.toLowerCase()] || [];
    return mappedSchedules.map((time, index) => ({
      id: index + 1,
      start_time: `2024-11-19T${time.split("-")[0]}`,
      end_time: `2024-11-24T${time.split("-")[1]}`,
    }));
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion(value);

    const filtered = uniqueSubstations.filter((substation) =>
      substation.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredSubstations(filtered);
    setShowDropdown(true);
  };

  const handleDropdownClick = (substation) => {
    setRegion(substation);
    setSelectedSubstation(substation);
    setShowDropdown(false);

    // Obtener los horarios y actualizar el estado
    const schedules = fetchSchedules(substation);
    setHorarios((prev) => ({
      ...prev,
      [substation]: schedules.map(
        (schedule) =>
          `${schedule.start_time.replace(
            "T",
            " "
          )} - ${schedule.end_time.replace("T", " ")}`
      ),
    }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubstation("");
  };

  return (
    <div>
      <h1>Horarios de Apagones</h1>
      <h3>Lunes 19/11 - Viernes 24/11</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="Ingrese su región"
            value={region}
            onClick={() => setShowDropdown(true)}
            onChange={handleRegionChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {showDropdown && (
            <ul
              style={{
                position: "absolute",
                zIndex: 1000,
                backgroundColor: "white",
                border: "1px solid #ccc",
                maxHeight: "200px",
                overflowY: "auto",
                width: "100%",
                listStyle: "none",
                margin: 0,
                padding: "5px 0",
              }}
            >
              {filteredSubstations.map((substation, index) => (
                <li
                  key={index}
                  onClick={() => handleDropdownClick(substation)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {substation}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Horarios para {selectedSubstation}</h2>
            <ul>
              {(horarios[selectedSubstation] || []).map((horario, index) => (
                <li key={index}>
                  {horario}{" "}
                  <button
                    style={{
                      marginLeft: "10px",
                      color: "red",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Nuevo horario"
                value={newHorario}
                onChange={(e) => setNewHorario(e.target.value)}
                style={{ marginRight: "10px", padding: "5px", width: "70%" }}
              />
              <button
                style={{
                  padding: "8px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Añadir
              </button>
            </div>
            <button className="close-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
