import React from 'react';
import { useLocation } from 'react-router-dom';
import Greeting from '../components/Greeting';

function Profile() {
  const location = useLocation();
  const userName = location.state?.userName || 'Usuario';

  return (
    <div>
      <Greeting name={userName} />
      <p>Aquí puedes consultar todas las funcionalidades disponibles.</p>
    </div>
  );
}

export default Profile;
