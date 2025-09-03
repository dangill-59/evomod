from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app import schemas, crud, dependencies, auth

router = APIRouter()

@router.get("/", response_model=schemas.SearchResults)
def search_documents(q: str = Query(...), db: Session = Depends(dependencies.get_db),
                     current_user=Depends(auth.get_current_active_user)):
    docs = crud.search_documents(db, q)
    return {"results": docs}