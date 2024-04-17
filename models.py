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

class MeaningfulDtp(BaseModel):
    time: str = Field(default="7:45")
    adress: str = Field(default="ш. Энтузиастов, д. 22")
    describtion: str = Field(default="Водитель, по причине неисправности ДВС совершил вынужденную остановку в первой полосе движения.")
    time_gubdd: int = Field(default=10)
    
class ImpotentEvents(BaseModel):
    time: str = Field(default="10:00")
    adress: str = Field(default="Образцова 9 стр.2")
    event_describtion: str = Field(default="Официальное открытие Хакатона «Битве тITанов»")

class NGPT(BaseModel):
    ngpt_yesterday: int = Field(default=1813023)
    ngpt_2weeks_ago: int = Field(default=1803450)
    daviation: int = Field(default=1)
    
class SurbanTrains(BaseModel):
    suburban_trains_yesterday: int = Field(dafault=6542307)
    suburban_trains_2weeks_ago: int = Field(dafault=6734101)
    daviation: int = Field(default=1)
    
class Taxi(BaseModel):
    taxi_yesterday: int = Field(dafault=1654320)
    taxi_2weeks_ago: int = Field(dafault=1732422)
    daviation: int = Field(default=1)
    
class Carshering(BaseModel):
    carshering_yesterday: int = Field(dafault=164201)
    carshering_2weeks_ago: int = Field(dafault=174253)
    daviation: int = Field(default=1)
    
class Electrosuda(BaseModel):
    electrosuda_yesterday: int = Field(dafault=66534)
    electrosuda_2weeks_ago: int = Field(dafault=57988)
    daviation: int = Field(default=1)
    
class PassangerTraffic(BaseModel):
    info_ngpt: NGPT
    infa_surban_trains: SurbanTrains
    infa_taxi: Taxi
    infa_carshering: Carshering
    infa_electrosuda: Electrosuda
