from fastapi import APIRouter, Depends, HTTPException
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

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(dependencies.get_db),
                   current_user=Depends(auth.get_current_active_user)):
    success = crud.delete_project(db, project_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found or you don't have permission to delete it")
    return {"message": "Project deleted successfully"}

@router.get("/{project_id}", response_model=schemas.ProjectRead)
def get_project(project_id: int, db: Session = Depends(dependencies.get_db),
                current_user=Depends(auth.get_current_active_user)):
    project = crud.get_project_by_id(db, project_id, current_user.id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project