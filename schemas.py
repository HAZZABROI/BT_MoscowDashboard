from pydantic import BaseModel, Field
from typing import List

from app.data import models

class ClientBaseErrorResponse(BaseModel):
    status: str = Field('error')
    details: str

class ClientBaseDateTimeResponse(BaseModel):
    data: models.DateTime

class ClientBaseWeatherResponse(BaseModel):
    data: models.Weather
    
class ClientBaseMeaningfulDtpResponse(BaseModel):
    data: models.MeaningfulDtp
    
class ClientBaseImpotentEventsResponse(BaseModel):
    data: models.ImpotentEvents

class ClientBasePassangerTrafficResponse(BaseModel):
    data: models.PassangerTraffic