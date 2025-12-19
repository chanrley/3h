import React, { useState } from 'react';
import { uploadCharacterImage } from '../services/api';
import './ImageUpload.css';

function ImageUpload({ characterId, currentImage, onImageUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Formato não permitido. Use: JPG, PNG, GIF ou WEBP');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Arquivo muito grande. Tamanho máximo: 5MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setSuccess(false);

      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await uploadCharacterImage(characterId, selectedFile);
      setSuccess(true);
      setPreview(null);
      setSelectedFile(null);
      
      // Atualizar imagem no componente pai
      if (onImageUploaded) {
        onImageUploaded(result.image_url);
      }

      // Limpar input
      const fileInput = document.getElementById('image-upload-input');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Erro ao fazer upload da imagem. Tente novamente.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
    const fileInput = document.getElementById('image-upload-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="image-upload">
      <h3>Alterar Imagem</h3>
      
      {success && (
        <div className="upload-message success">
          ✓ Imagem enviada com sucesso!
        </div>
      )}

      {error && (
        <div className="upload-message error">
          ✗ {error}
        </div>
      )}

      <div className="upload-preview">
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <img src={currentImage} alt="Imagem atual" />
        )}
      </div>

      <div className="upload-controls">
        <label htmlFor="image-upload-input" className="upload-button">
          {selectedFile ? 'Trocar Arquivo' : 'Selecionar Imagem'}
        </label>
        <input
          id="image-upload-input"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {selectedFile && (
          <>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="upload-submit-button"
            >
              {uploading ? 'Enviando...' : 'Enviar Imagem'}
            </button>
            <button
              onClick={handleCancel}
              disabled={uploading}
              className="upload-cancel-button"
            >
              Cancelar
            </button>
          </>
        )}
      </div>

      <p className="upload-hint">
        Formatos aceitos: JPG, PNG, GIF, WEBP (máx. 5MB)
      </p>
    </div>
  );
}

export default ImageUpload;

