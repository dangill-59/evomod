from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Table, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")
    projects = relationship("Project", back_populates="owner")
    documents = relationship("Document", back_populates="owner")

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))
    fields = Column(Text)  # JSON string for custom fields
    owner = relationship("User", back_populates="projects")
    documents = relationship("Document", back_populates="project")

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    content = Column(Text)
    # Removed TSVECTOR for SQLite compatibility
    project_id = Column(Integer, ForeignKey("projects.id"))
    owner_id = Column(Integer, ForeignKey("users.id"))
    doc_metadata = Column(Text)  # JSON string for metadata
    created_at = Column(DateTime, default=func.now())
    project = relationship("Project", back_populates="documents")
    owner = relationship("User", back_populates="documents")