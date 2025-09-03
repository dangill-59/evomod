from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas, crud, dependencies, auth
from typing import List

router = APIRouter()

@router.post("/", response_model=schemas.ProjectRead)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(dependencies.get_db),
                   current_user=Depends(auth.get_current_active_user)):
    return crud.create_project(db, project, owner_id=current_user.id)

@router.get("/", response_model=List[schemas.ProjectRead])
def list_projects(db: Session = Depends(dependencies.get_db),
                  current_user=Depends(auth.get_current_active_user)):
    return crud.get_user_projects(db, current_user.id)