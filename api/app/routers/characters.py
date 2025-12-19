from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List
import json
import os
import shutil
from app.models.character import Character

router = APIRouter()

def get_characters_file_path():
    """Retorna o caminho do arquivo de personagens"""
    return os.path.join(os.path.dirname(__file__), "..", "data", "characters.json")

def get_images_dir():
    """Retorna o diretório de imagens"""
    return os.path.join(os.path.dirname(__file__), "..", "static", "images")

def load_characters():
    """Carrega os personagens do arquivo JSON"""
    file_path = get_characters_file_path()
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_characters(characters):
    """Salva os personagens no arquivo JSON"""
    file_path = get_characters_file_path()
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(characters, f, ensure_ascii=False, indent=2)

@router.get("/", response_model=List[Character])
def get_all_characters():
    """Retorna todos os personagens"""
    return load_characters()

@router.get("/{character_id}", response_model=Character)
def get_character(character_id: int):
    """Retorna um personagem específico por ID"""
    characters = load_characters()
    character = next((c for c in characters if c["id"] == character_id), None)
    if not character:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")
    return character

@router.post("/{character_id}/upload-image")
async def upload_character_image(character_id: int, file: UploadFile = File(...)):
    """
    Faz upload de uma imagem para um personagem específico.
    
    Args:
        character_id: ID do personagem
        file: Arquivo de imagem a ser enviado
        
    Returns:
        URL da imagem salva
    """
    # Validar extensão do arquivo
    allowed_extensions = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Formato de arquivo não permitido. Use: {', '.join(allowed_extensions)}"
        )
    
    # Carregar personagens
    characters = load_characters()
    character = next((c for c in characters if c["id"] == character_id), None)
    if not character:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")
    
    # Criar diretório de imagens se não existir
    images_dir = get_images_dir()
    os.makedirs(images_dir, exist_ok=True)
    
    # Gerar nome do arquivo: character_{id}{extensão}
    filename = f"character_{character_id}{file_ext}"
    file_path = os.path.join(images_dir, filename)
    
    # Salvar arquivo
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Atualizar URL da imagem no personagem
    image_url = f"/static/images/{filename}"
    character["image"] = image_url
    
    # Salvar personagens atualizados
    save_characters(characters)
    
    return {"message": "Imagem enviada com sucesso", "image_url": image_url}


