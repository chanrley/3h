from pydantic import BaseModel
from typing import List, Optional

class Character(BaseModel):
    id: int
    name: str
    title: str
    description: str
    image: str
    realm: str
    weapons: List[str]
    abilities: List[str]
    stats: dict
    games: List[str]


