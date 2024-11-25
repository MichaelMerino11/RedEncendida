const BASE_URL = '/api/subestaciones';

export const getSubestaciones = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const getSubestacionByName = async (name) => {
  const response = await fetch(`${BASE_URL}/${name}`);
  return response.json();
};
