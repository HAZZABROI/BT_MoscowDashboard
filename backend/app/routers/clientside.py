from fastapi import APIRouter, Header, HTTPException

from typing import Annotated, Dict
from app.data import models, schemas

router = APIRouter(prefix="/client", tags=["Client side"])