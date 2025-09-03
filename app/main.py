import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, projects, documents, search

app = FastAPI(title="Intelligent Document Management System")

# Get allowed origins from environment variable, with sensible defaults for development
# For production, set CORS_ORIGINS environment variable to comma-separated list of allowed origins
# Example: CORS_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "").split(",") if os.getenv("CORS_ORIGINS") else [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",  # Alternative React dev port
    "http://127.0.0.1:3001",
    "http://0.0.0.0:3000",    # Docker networking
    "http://0.0.0.0:3001",
]

# Remove empty strings from the list
CORS_ORIGINS = [origin.strip() for origin in CORS_ORIGINS if origin.strip()]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(documents.router, prefix="/documents", tags=["documents"])
app.include_router(search.router, prefix="/search", tags=["search"])

@app.get("/")
def read_root():
    return {"message": "Welcome to EvoMod Intelligent Document Management System"}