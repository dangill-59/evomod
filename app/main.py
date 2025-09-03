from fastapi import FastAPI
from app.routers import users, projects, documents, search

app = FastAPI(title="Intelligent Document Management System")

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(documents.router, prefix="/documents", tags=["documents"])
app.include_router(search.router, prefix="/search", tags=["search"])