import React, { useState, useEffect } from "react";
import "./Modal.css";

function App() {
  const [region, setRegion] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [substations, setSubstations] = useState([]);
  const [filteredSubstations, setFilteredSubstations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      "santa rosa 1",
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
      "santa rosa 2",
      "sector industrial (santa rosa 3, inga bajo 2, sangolqui)",
      "escuela sucre",
      "la marin",
      "diez vieja",
      "san pablo",
      "diez nueva",
      "aereopuerto",
      "batán alto",
    ])
  );

  useEffect(() => {
    setSubstations(uniqueSubstations);
    setFilteredSubstations(uniqueSubstations);
  }, []);

  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion(value);

    const filtered = substations.filter((substation) =>
      substation.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredSubstations(filtered);
    setShowDropdown(true);
  };

  const handleSearch = () => {
    if (region) {
      fetchSchedules();
      setShowDropdown(false);
    }
  };

  const handleDropdownClick = (substation) => {
    setRegion(substation);
    setShowDropdown(false);
  };

  const fetchSchedules = () => {
    // Simulación de datos para el ejemplo
    const mockSchedules = [
      {
        id: 1,
        start_time: "2024-11-12T08:00:00",
        end_time: "2024-11-12T12:00:00",
      },
      {
        id: 2,
        start_time: "2024-11-12T14:00:00",
        end_time: "2024-11-12T18:00:00",
      },
    ];
    setSchedules(mockSchedules);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Horarios para {region}</h2>
            <ul>
              {schedules.map((schedule) => (
                <li key={schedule.id}>
                  {new Date(schedule.start_time).toLocaleString()} -{" "}
                  {new Date(schedule.end_time).toLocaleString()}
                </li>
              ))}
            </ul>
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
