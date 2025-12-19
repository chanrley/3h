import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCharacters } from '../services/api';
import CharacterCard from './CharacterCard';
import './CharacterList.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCharacters()
      .then(data => {
        // Ajustar URLs de imagens locais
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const adjustedData = data.map(char => {
          if (char.image && char.image.startsWith('/static')) {
            char.image = `${apiUrl}${char.image}`;
          }
          return char;
        });
        setCharacters(adjustedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar personagens:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="character-list">
      <div className="character-grid">
        {characters.map(character => (
          <Link key={character.id} to={`/character/${character.id}`} className="character-link">
            <CharacterCard character={character} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;


