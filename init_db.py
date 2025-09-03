#!/usr/bin/env python3

"""
Initialize the database with tables
"""

from app.database import engine, Base
from app.models import User, Project, Document

def init_db():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db()