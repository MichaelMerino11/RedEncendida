import React, { useState } from 'react';

const substations = [
  { name: 'miraflores', schedule: ['00:00-04:00', '12:00-16:00'] },
  { name: 'el bosque', schedule: ['00:00-04:00', '12:00-16:00'] },
  { name: 'andalucía', schedule: ['00:00-04:00', '12:00-16:00'] },
  { name: 'conocoto', schedule: ['00:00-04:00', '12:00-16:00'] },
  { name: 'cumbayá', schedule: ['00:00-04:00', '12:00-16:00'] },
  { name: 'eugenio espejo', schedule: ['00:00-04:00', '12:00-16:00'] },
  { name: 'luluncoto', schedule: ['08:00-12:00', '20:00-24:00'] },
  { name: 'la floresta', schedule: ['08:00-12:00', '20:00-24:00'] },
  { name: 'epiclachima', schedule: ['08:00-12:00', '20:00-24:00'] },
  { name: 'nueva cumbayá', schedule: ['08:00-12:00', '20:00-24:00'] },
  { name: 'la carolina', schedule: ['02:00-06:00', '19:00-23:00'] },
  { name: 'tababela', schedule: ['02:00-06:00', '19:00-23:00'] },
  { name: 'los bancos', schedule: ['02:00-06:00', '19:00-23:00'] },
  { name: 'pérez guerrero', schedule: ['02:00-06:00', '19:00-23:00'] },
  { name: 'el obraje (machachi)', schedule: ['02:00-06:00', '19:00-23:00'] },
  { name: 'chimbacalle', schedule: ['08:00-12:00', '20:00-24:00'] },
  { name: 'belisario quevedo', schedule: ['08:00-12:00', '20:00-24:00'] },
  { name: 'iñaquito', schedule: ['08:00-12:00', '20:00-24:00'] },
  { name: 'inga bajo', schedule: ['08:00-12:00', '20:00-24:00'] },
  { name: 'chilibulo', schedule: ['07:00-11:00', '20:00-24:00'] },
  { name: 'granda centeno', schedule: ['07:00-11:00', '20:00-24:00'] },
  { name: 'río coca', schedule: ['07:00-11:00', '20:00-24:00'] },
  { name: 'gualo', schedule: ['04:00-08:00', '16:00-20:00'] },
  { name: 'sangolquí', schedule: ['04:00-08:00', '16:00-20:00'] },
  { name: 'barrionuevo', schedule: ['02:00-06:00', '14:00-18:00'] },
  { name: 'santa rosa', schedule: ['02:00-06:00', '14:00-18:00'] },
  { name: 'el quinche', schedule: ['02:00-06:00', '14:00-18:00'] },
  { name: 'olímpico', schedule: ['10:00-14:00', '20:00-24:00'] },
  { name: 'cristianía', schedule: ['10:00-14:00', '20:00-24:00'] },
  { name: 'san antonio', schedule: ['10:00-14:00', '20:00-24:00'] },
  { name: 'alangasí', schedule: ['10:00-14:00', '20:00-24:00'] },
  { name: 'san rafael', schedule: ['06:00-10:00', '16:00-20:00'] },
  { name: 'tumbaco', schedule: ['06:00-10:00', '16:00-20:00'] },
  { name: 'pomasqui', schedule: ['06:00-10:00', '16:00-20:00'] },
  { name: 'san roque', schedule: ['00:00-04:00', '15:00-19:00'] },
  { name: 'inga bajo 1', schedule: ['00:00-04:00', '15:00-19:00'] },
  { name: 'sector industrial', schedule: ['17:00-24:00'] },
  { name: 'escuela sucre', schedule: ['11:00-15:00', '20:00-24:00'] },
  { name: 'la marin', schedule: ['11:00-15:00', '20:00-24:00'] },
  { name: 'diez vieja', schedule: ['11:00-15:00', '20:00-24:00'] },
  { name: 'san pablo', schedule: ['11:00-15:00', '20:00-24:00'] },
  { name: 'diez nueva', schedule: ['11:00-15:00', '20:00-24:00'] },
  { name: 'aereopuerto', schedule: ['12:00-16:00', '20:00-24:00'] },
  { name: 'batán alto', schedule: ['12:00-16:00', '20:00-24:00'] }
];

function SearchBar() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const substation = substations.find((s) => s.name === query.toLowerCase());
    if (substation) {
      setResult(substation.schedule);
    } else {
      setResult('No se encontró la subestación.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar subestación"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      {result && <p>Horario: {Array.isArray(result) ? result.join(', ') : result}</p>}
    </div>
  );
}

export default SearchBar;
