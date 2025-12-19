from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers import characters
import os

app = FastAPI(title="GoDex API", version="1.0.0")

# CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir arquivos estáticos (imagens)
static_dir = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(static_dir, exist_ok=True)
os.makedirs(os.path.join(static_dir, "images"), exist_ok=True)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

app.include_router(characters.router, prefix="/api/characters", tags=["characters"])

@app.get("/")
def root():
    return {"message": "GoDex API - God of War Characters"}


