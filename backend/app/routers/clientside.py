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

@router.get("/meaningful_dtp",
             tags=["Client side"]
)

async def get_meaningful_dtp() -> schemas.ClientBaseMeaningfulDtpResponse:
    time = "7:45"
    adress = "Образцова 9 стр.2"
    event_description = "Официальное открытие Хакатона «Битве тITанов"
    time_gubdd = 10
    
    respons = schemas.ClientBaseMeaningfulDtpResponse(
        data = models.MeaningfulDtp(
            time=time,
            adress=adress,
            descridtion=event_description,
            time_gubdd=time_gubdd
        )
    )
    return respons

@router.get("/meaningful_dtp",
             tags=["Client side"]
)

async def impotent_events() -> schemas.ClientBaseImpotentEventsResponse:
    time = "7:45"
    adress = "Образцова 9 стр.2"
    event_describtion = "Официальное открытие Хакатона «Битве тITанов"
    
    respons = schemas.ClientBaseImpotentEventsResponse(
        data = models.ImpotentEvents()
    )
    return respons

@router.get("/meaningful_dtp",
             tags=["Client side"]
)
async def passanger_traffic() -> schemas.ClientBaseImpotentEventsResponse:
    respons = schemas.ClientBasePassangerTrafficResponse(
        data = models.PassangerTraffic()
    )
    return respons
