from pydantic import BaseModel, field_validator, Field
from typing import Optional, List, Dict
import json

class UserCreate(BaseModel):
    username: str
    password: str

class UserRead(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        from_attributes = True

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
        from_attributes = True
        
    @field_validator('fields', mode='before')
    @classmethod
    def parse_fields(cls, v):
        if isinstance(v, str):
            return json.loads(v) if v else {}
        return v if v is not None else {}

class DocumentCreate(BaseModel):
    filename: str
    project_id: int
    metadata: Optional[Dict] = {}

class DocumentRead(BaseModel):
    id: int
    filename: str
    content: str
    metadata: Dict = Field(alias='doc_metadata')
    project_id: int
    owner_id: int

    class Config:
        from_attributes = True
        populate_by_name = True
        
    @field_validator('metadata', mode='before')
    @classmethod
    def parse_metadata(cls, v):
        if isinstance(v, str):
            return json.loads(v) if v else {}
        return v if v is not None else {}

class SearchResults(BaseModel):
    results: List[DocumentRead]