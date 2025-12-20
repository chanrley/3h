# GoDex - Pokédex de Personagens do God of War

Aplicação estilo Pokédex para visualizar e explorar personagens do universo de God of War.

## 🏗️ Arquitetura

- **Backend**: Python com FastAPI
- **Frontend**: React
- **Containerização**: Docker e Docker Compose
- **Armazenamento**: JSON (sem banco de dados)

## 📁 Estrutura do Projeto

```
godex/
├── api/                    # Backend Python
│   ├── app/
│   │   ├── main.py        # Aplicação FastAPI
│   │   ├── models/        # Modelos Pydantic
│   │   ├── routers/       # Rotas da API
│   │   └── data/          # Dados JSON
│   ├── requirements.txt
│   └── Dockerfile
├── web/                    # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── services/      # Serviços API
│   │   └── App.jsx
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## 🚀 Como Executar

### Pré-requisitos

- Docker e Docker Compose instalados
- Git (opcional)

### Instalação e Execução

1. Clone ou baixe o repositório:
```bash
cd godex
```

2. Execute com Docker Compose:
```bash
docker-compose up --build
```

3. Acesse a aplicação:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **Documentação da API**: http://localhost:8000/docs

### Comandos Úteis

- **Parar os containers**:
```bash
docker-compose down
```

- **Ver logs**:
```bash
docker-compose logs -f
```

- **Reconstruir containers**:
```bash
docker-compose up --build
```

## 📡 Endpoints da API

### GET `/api/characters/`
Retorna lista de todos os personagens.

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Kratos",
    "title": "Fantasma de Esparta",
    ...
  }
]
```

### GET `/api/characters/{id}`
Retorna detalhes de um personagem específico.

**Exemplo:** `/api/characters/1`

## 🎮 Funcionalidades

- Listagem de personagens em grid estilo Pokédex
- Visualização detalhada de cada personagem
- Estatísticas, armas e habilidades
- Design responsivo
- Navegação intuitiva

## 🛠️ Desenvolvimento

### Backend (Python)

Para desenvolver sem Docker:

```bash
cd api
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (React)

Para desenvolver sem Docker:

```bash
cd web
npm install
npm start
```

## 📝 Adicionar Novos Personagens

Edite o arquivo `api/app/data/characters.json` e adicione novos personagens seguindo a estrutura:

```json
{
  "id": 7,
  "name": "Nome do Personagem",
  "title": "Título",
  "description": "Descrição",
  "image": "URL da imagem",
  "realm": "Reino",
  "weapons": ["Arma 1", "Arma 2"],
  "abilities": ["Habilidade 1", "Habilidade 2"],
  "stats": {
    "strength": 80,
    "speed": 70,
    "magic": 60,
    "defense": 75
  },
  "games": ["Jogo 1", "Jogo 2"]
}
```

## 🐳 Docker

Os containers são configurados com volumes para desenvolvimento, permitindo hot-reload tanto no backend quanto no frontend.

## 📄 Licença

Este projeto é apenas para fins educacionais e de demonstração.
