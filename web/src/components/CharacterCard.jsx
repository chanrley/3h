import React from 'react';
import './CharacterCard.css';

function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <div className="card-info">
        <h2>{character.name}</h2>
        <p className="title">{character.title}</p>
        <p className="realm">{character.realm}</p>
      </div>
    </div>
  );
}

export default CharacterCard;


