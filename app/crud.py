from sqlalchemy.orm import Session
from app import models, schemas
import json

def create_user(db: Session, user: schemas.UserCreate, hashed_password: str):
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_project(db: Session, project: schemas.ProjectCreate, owner_id: int):
    db_project = models.Project(
        name=project.name,
        description=project.description,
        owner_id=owner_id,
        fields=json.dumps(project.fields)
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def create_document(db: Session, filename: str, content: str, project_id: int, owner_id: int, metadata: dict):
    db_doc = models.Document(
        filename=filename,
        content=content,
        project_id=project_id,
        owner_id=owner_id,
        metadata=json.dumps(metadata)
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc

def search_documents(db: Session, query: str):
    # Full-text search using PostgreSQL's to_tsvector and plainto_tsquery
    return db.query(models.Document).filter(models.Document.content_vector.op("@@")(
        "plainto_tsquery('english', :query)"
    )).params(query=query).all()