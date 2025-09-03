# EvoMod - Intelligent Document Management System

An intelligent document management system with OCR capabilities, user authentication, project management, and advanced search functionality.

## Features

- **User Authentication**: Secure user registration and login system
- **Project Management**: Create and manage projects with document organization
- **Document Upload**: Upload documents with OCR text extraction
- **Search Functionality**: Advanced search across documents and projects
- **Web Interface**: Modern React-based frontend with responsive design

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **PostgreSQL**: Database (with SQLite support for development)
- **Pytesseract**: OCR for text extraction from images/PDFs
- **JWT**: Token-based authentication

### Frontend
- **React**: User interface library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **CSS3**: Modern styling with responsive design

## Project Structure

```
evomod/
├── app/                    # Backend application
│   ├── routers/           # API route handlers
│   ├── auth.py            # Authentication logic
│   ├── database.py        # Database configuration
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   └── main.py            # FastAPI application entry point
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── hooks/         # Custom React hooks
│   └── public/            # Static assets
├── init_db.py             # Database initialization script
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize the database:**
   ```bash
   python init_db.py
   ```

4. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`
   API documentation at `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `GET /users/me` - Get current user info

### Projects
- `GET /projects/` - List user projects
- `POST /projects/` - Create new project
- `GET /projects/{project_id}` - Get project details

### Documents
- `POST /documents/` - Upload document
- `GET /documents/{document_id}` - Get document details

### Search
- `GET /search/` - Search documents and projects

## Development

### Running Tests

**Backend tests:**
```bash
# Run with pytest (if tests are added)
pytest
```

**Frontend tests:**
```bash
cd frontend
npm test
```

### Building for Production

**Backend:**
```bash
# Install production dependencies
pip install -r requirements.txt
# Run with production ASGI server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run build
```

## Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
# Database
DATABASE_URL=sqlite:///./app.db

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
# For development, the default origins include localhost:3000, 127.0.0.1:3000, etc.
# For production, specify your allowed origins as a comma-separated list:
# CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# OCR (if using external service)
TESSERACT_PATH=/usr/bin/tesseract
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors like "Access to XMLHttpRequest has been blocked by CORS policy", check the following:

1. **Development**: The default configuration allows common development origins (`localhost:3000`, `127.0.0.1:3000`, etc.)

2. **Custom Port**: If your frontend runs on a different port, set the `CORS_ORIGINS` environment variable:
   ```bash
   export CORS_ORIGINS="http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000"
   ```

3. **Production**: Always specify exact origins in production:
   ```bash
   export CORS_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
   ```

4. **Docker**: When using Docker, include container networking origins:
   ```bash
   export CORS_ORIGINS="http://localhost:3000,http://0.0.0.0:3000"
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.