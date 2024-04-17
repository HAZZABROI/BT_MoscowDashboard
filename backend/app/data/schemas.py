from pydantic import BaseModel, Field
from typing import List

from app.data import models

class ClientBaseStatusResponse(BaseModel):
    status: str = Field('success')


class ClientBaseErrorResponse(BaseModel):
    status: str = Field('error')
    details: str