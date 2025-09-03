from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app import schemas, crud, auth, dependencies
from app.models import User

router = APIRouter()

@router.post("/register", response_model=schemas.UserRead)
def register(user: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = auth.get_password_hash(user.password)
    return crud.create_user(db, user, hashed_password)

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(dependencies.get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}