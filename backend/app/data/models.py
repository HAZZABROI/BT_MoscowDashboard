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


class Score(BaseModel):
    date: DateTime
    score: int = Field(default=1)


class WorkloadHW(BaseModel):
    date: DateTime
    nameHW: str = Field(default="Волоколамское шоссе")
    direction: str = Field(default="из центра | в центр | внешняя | внутренняя")
    top: int = Field(default=1)


class Workload(BaseModel):
    date: DateTime
    score: int = Field(default=1)
    nearest: List[Score]
    lenght_jam: int = Field(default=126)
    trend_jam: str = Field(default="up | down | no_diff")
    trend_time: str = Field(default="up | down | no_diff")
    deviation_appn_jam: float = Field(default=23, description="In percentage")
    deviation_appg_jam: float = Field(default=11, description="In percentage")
    driving_time_min: int = Field(default=12, description="Travel time per 10 km")
    deviation_appn_driving: float = Field(default=23, description="In percentage")
    deviation_appg_driving: float = Field(default=11, description="In percentage")
    top_list: List[WorkloadHW] = Field(description="Top 3 busiest highways")


class InfoTaxi(BaseModel):
    date: DateTime
    count: int = Field(default=123)
    trend: str = Field(default="up | down | no_diff")
    deviation_appn_count: float = Field(default=23, description="In percentage")
    deviation_appg_count: float = Field(default=11, description="In percentage")


class InfoCarsharing(BaseModel):
    date: DateTime
    count: int = Field(default=123)
    trend: str = Field(default="up | down | no_diff")
    deviation_appn_count: float = Field(default=23, description="In percentage")
    deviation_appg_count: float = Field(default=11, description="In percentage")


class InfoDetailTransportNearest(BaseModel):
    date: DateTime
    count: int = Field(default=123)


class InfoNGPT(BaseModel):
    date: DateTime
    count: int = Field(default=123)
    trend: str = Field(default="up | down | no_diff")
    deviation_appn_count: float = Field(default=23, description="In percentage")
    deviation_appg_count: float = Field(default=11, description="In percentage")


class TransportInfo(BaseModel):
    date: DateTime
    unic_count: int = Field(default=12332)
    nearest: List[InfoDetailTransportNearest]
    trend: str = Field(default="up | down | no_diff")
    infoTaxi: InfoTaxi
    infoCarsharing: InfoCarsharing
    infoNGPT: InfoNGPT 


class ApprovedWork(BaseModel):
    date: DateTime
    count: int = Field(default=20)
    deviation_appn_count: int = Field(default=23, description="In percentage")
    deviation_appg_count: int = Field(default=11, description="In percentage")


class UnknownWork(BaseModel):
    date: DateTime
    count: int = Field(default=20)
    deviation_appn_count: int = Field(default=23, description="In percentage")
    deviation_appg_count: int = Field(default=11, description="In percentage")


class ConstructionWork(BaseModel):
    date: DateTime
    unknownWorksList: List[UnknownWork]
    approvedWorkList: List[ApprovedWork]
    

class TrafficAccident(BaseModel):
    count: int = Field(default=20)
    trend: str = Field(default="up | down | no_diff")
    deviation_appn_count: int = Field(default=23, description="In percentage")
    deviation_appg_count: int = Field(default=11, description="In percentage")


class TrafficAccidentDieInfo(BaseModel):
    date_from: DateTime
    count: int = Field(default=1, description="Number of people killed in road accidents since the beginning of the day as of the current moment")

#----------------------------------------

class MeaningfulDtp(BaseModel):
    time: str = Field(default="7:45")
    adress: str = Field(default="ш. Энтузиастов, д. 22")
    describtion: str = Field(default="Водитель, по причине неисправности ДВС совершил вынужденную остановку в первой полосе движения.")
    time_gubdd: int = Field(default=10)
    
class ImpotentEvents(BaseModel):
    time: str = Field(default="10:00")
    adress: str = Field(default="Образцова 9 стр.2")
    event_describtion: str = Field(default="Официальное открытие Хакатона «Битве тITанов")

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
