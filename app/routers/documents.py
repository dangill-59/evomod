from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app import schemas, crud, ocr, dependencies, auth
import json

router = APIRouter()

@router.post("/", response_model=schemas.DocumentRead)
async def upload_document(project_id: int, metadata: str = '{}', file: UploadFile = File(...),
                          db: Session = Depends(dependencies.get_db),
                          current_user=Depends(auth.get_current_active_user)):
    file_bytes = await file.read()
    try:
        text = ocr.extract_text_from_file(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"OCR extraction failed: {str(e)}")
    meta = json.loads(metadata)
    return crud.create_document(db, file.filename, text, project_id, current_user.id, meta)