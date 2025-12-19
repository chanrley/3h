import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getCharacters = async () => {
  const response = await axios.get(`${API_URL}/api/characters/`);
  return response.data;
};

export const getCharacter = async (id) => {
  const response = await axios.get(`${API_URL}/api/characters/${id}`);
  return response.data;
};

export const uploadCharacterImage = async (characterId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(
    `${API_URL}/api/characters/${characterId}/upload-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};


