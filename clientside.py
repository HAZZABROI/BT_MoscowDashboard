from fastapi import APIRouter, Header, HTTPException

from typing import Annotated, Dict
from app.data import models, schemas

router = APIRouter(prefix="/server", tags=["Client side"])

@router.get("/datetime",
            tags=["Client side"]
)
async def get_date() -> schemas.ClientBaseDateTimeResponse:
    date = "2024-04-12"
    time = "12:00"

    response = schemas.ClientBaseDateTimeResponse(
        data=models.DateTime(
            date=date,
            time=time
        )
    )
    return response

@router.get("/weather",
            tags=["Client side"]
)
async def get_weather() -> schemas.ClientBaseWeatherResponse:
    status_weather_now = "облачно"
    teperature = 2
    nearest = []
    for i in range(3):
        nearest.append(models.WeatherInfo(
            status_weather="Облачно",
            temperature=i
        ))
    
    response = schemas.ClientBaseWeatherResponse(
        data=models.Weather(
            now=models.WeatherInfo(
                status_weather=status_weather_now,
                temperature=teperature
            ),
            nearest=nearest
        )
    )
    return response

