from pydantic import BaseModel
from typing import Optional, List, Dict

class UserCreate(BaseModel):
    username: str
    password: str

class UserRead(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        orm_mode = True

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = ""
    fields: Optional[Dict] = {}

class ProjectRead(BaseModel):
    id: int
    name: str
    description: str
    fields: Dict

    class Config:
        orm_mode = True

class DocumentCreate(BaseModel):
    filename: str
    project_id: int
    metadata: Optional[Dict] = {}

class DocumentRead(BaseModel):
    id: int
    filename: str
    content: str
    metadata: Dict
    project_id: int
    owner_id: int

    class Config:
        orm_mode = True

class SearchResults(BaseModel):
    results: List[DocumentRead]