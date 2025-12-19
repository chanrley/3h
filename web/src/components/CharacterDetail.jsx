import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacter } from '../services/api';
import ImageUpload from './ImageUpload';
import './CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacter();
  }, [id]);

  const loadCharacter = () => {
    setLoading(true);
    getCharacter(id)
      .then(data => {
        // Se a imagem começar com /static, adicionar o host da API
        if (data.image && data.image.startsWith('/static')) {
          const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
          data.image = `${apiUrl}${data.image}`;
        }
        setCharacter(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar personagem:', error);
        setLoading(false);
      });
  };

  const handleImageUploaded = (imageUrl) => {
    // Recarregar o personagem para obter os dados atualizados
    loadCharacter();
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (!character) return <div className="error">Personagem não encontrado</div>;

  return (
    <div className="character-detail">
      <Link to="/" className="back-button">← Voltar</Link>
      <div className="detail-content">
        <div className="detail-image">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="detail-info">
          <h1>{character.name}</h1>
          <h2>{character.title}</h2>
          <p className="description">{character.description}</p>
          <div className="realm-badge">
            <span>Reino: {character.realm}</span>
          </div>
          <div className="stats">
            <h3>Estatísticas</h3>
            <div className="stat-bar">
              <span>Força: {character.stats.strength}</span>
              <div className="bar-container">
                <div className="bar strength" style={{width: `${character.stats.strength}%`}}></div>
              </div>
            </div>
            <div className="stat-bar">
              <span>Velocidade: {character.stats.speed}</span>
              <div className="bar-container">
                <div className="bar speed" style={{width: `${character.stats.speed}%`}}></div>
              </div>
            </div>
            <div className="stat-bar">
              <span>Magia: {character.stats.magic}</span>
              <div className="bar-container">
                <div className="bar magic" style={{width: `${character.stats.magic}%`}}></div>
              </div>
            </div>
            <div className="stat-bar">
              <span>Defesa: {character.stats.defense}</span>
              <div className="bar-container">
                <div className="bar defense" style={{width: `${character.stats.defense}%`}}></div>
              </div>
            </div>
          </div>
          <div className="weapons">
            <h3>Armas</h3>
            <ul>
              {character.weapons.map((weapon, index) => (
                <li key={index}>{weapon}</li>
              ))}
            </ul>
          </div>
          <div className="abilities">
            <h3>Habilidades</h3>
            <ul>
              {character.abilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))}
            </ul>
          </div>
          <div className="games">
            <h3>Jogos</h3>
            <ul>
              {character.games.map((game, index) => (
                <li key={index}>{game}</li>
              ))}
            </ul>
          </div>
          
          <ImageUpload 
            characterId={character.id} 
            currentImage={character.image}
            onImageUploaded={handleImageUploaded}
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;


