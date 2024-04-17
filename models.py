from pydantic import BaseModel, Field
from datetime import datetime

from typing import List, Optional

class DateTime(BaseModel):
    date: str = Field(default="2024-04-17")
    time: str = Field(default="13:00")

class WeatherInfo(BaseModel):
    status_weather: str = Field(default="облачно | небольшой дождь | дождь | дождь со снегом")
    temperature: int = Field(default=1)

class Weather(BaseModel):
    now: WeatherInfo
    nearest: List[WeatherInfo]
