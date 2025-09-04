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

def get_user_projects(db: Session, user_id: int):
    return db.query(models.Project).filter(models.Project.owner_id == user_id).all()

def delete_project(db: Session, project_id: int, user_id: int):
    project = db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == user_id
    ).first()
    if project:
        db.delete(project)
        db.commit()
        return True
    return False

def get_project_by_id(db: Session, project_id: int, user_id: int):
    return db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == user_id
    ).first()

def create_document(db: Session, filename: str, content: str, project_id: int, owner_id: int, metadata: dict):
    db_doc = models.Document(
        filename=filename,
        content=content,
        project_id=project_id,
        owner_id=owner_id,
        doc_metadata=json.dumps(metadata)  # Fixed field name
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc

def search_documents(db: Session, query: str):
    # Simple text search for SQLite compatibility
    return db.query(models.Document).filter(
        models.Document.content.contains(query)
    ).all()