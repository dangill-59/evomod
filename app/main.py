import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
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

# Custom exception handler to ensure CORS headers are included in error responses
@app.exception_handler(Exception)
async def custom_exception_handler(request: Request, exc: Exception):
    """
    Custom exception handler that ensures CORS headers are included in all responses,
    including error responses. This prevents CORS errors when the backend returns 500 errors.
    """
    response = JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )
    
    # Add CORS headers manually to ensure they're present in error responses
    origin = request.headers.get("origin")
    if origin and origin in CORS_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Vary"] = "Origin"
    
    return response

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """
    Custom HTTP exception handler that ensures CORS headers are included in HTTP error responses.
    """
    response = JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )
    
    # Add CORS headers manually to ensure they're present in error responses
    origin = request.headers.get("origin")
    if origin and origin in CORS_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Vary"] = "Origin"
    
    return response

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(documents.router, prefix="/documents", tags=["documents"])
app.include_router(search.router, prefix="/search", tags=["search"])

@app.get("/")
def read_root():
    return {"message": "Welcome to EvoMod Intelligent Document Management System"}