from fastapi import APIRouter, Header, HTTPException

from typing import Annotated, Dict
from app.data import models, schemas

from app.generators import data_getter

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
    data = data_getter.get_weather_data()

    status_weather_now = data.iloc[0]['weather_status']
    teperature = data.iloc[0]['weather_temp']

    nearest = []
    for i in range(1, 4):
        nearest.append(models.WeatherInfo(
            status_weather=data.iloc[i]['weather_status'],
            temperature=data.iloc[i]['weather_temp']
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

@router.get("/workload",
            tags=["Client side"]
)
async def get_workload() -> schemas.ClientBaseWorkloadResponse:
    nearest = []
    for i in range(3):
        nearest.append(models.Score(
            date=models.DateTime(),
            score=i
        ))

    workload_top = []
    for i in range(4):
        workload_top.append(models.WorkloadHW(
            date=models.DateTime()
        ))
    
    response = schemas.ClientBaseWorkloadResponse(
        data=models.Workload(
            date=models.DateTime(),
            top_list=workload_top,
            nearest=nearest
        )
    )
    return response

@router.get("/transport/info",
            tags=["Client side"]
)
async def get_transport_info() -> schemas.ClientBaseTransportInfoResponse:
    
    response = schemas.ClientBaseTransportInfoResponse(
        data=models.TransportInfo(
            date=models.DateTime(),
            infoTaxi=models.InfoTaxi(
                date=models.DateTime()
            ),
            infoNGPT=models.InfoNGPT(
                date=models.DateTime()
            ),
            infoCarsharing=models.InfoCarsharing(
                date=models.DateTime()
            )
        )
    )
    return response

@router.get("/transport/info",
            tags=["Client side"]
)
async def get_construction_work() -> schemas.ClientBaseConstructionWorkResponse:
    
    unknownWorksList = []
    approvedWorkList = []

    for i in range(3):
        unknownWorksList.append(models.UnknownWork(
            date=models.DateTime(),
            count=i
        ))

    for i in range(3):
        approvedWorkList.append(models.ApprovedWork(
            date=models.DateTime(),
            count=i
        ))

    response = schemas.ClientBaseConstructionWorkResponse(
        data=models.ConstructionWork(
            date=models.DateTime(),
            unknownWorksList=unknownWorksList,
            approvedWorkList=approvedWorkList
        )
    )
    return response

@router.get("/traffic/accident",
            tags=["Client side"]
)
async def get_accident() -> schemas.ClientBaseTrafficAccidentResponse:

    data = data_getter.get_traffic_accidents_data()

    response = schemas.ClientBaseTrafficAccidentResponse(
        data=models.TrafficAccident(
            count=data["current_accident_cnt"],
            trend=data["trend"],
            deviation_appn_count=data["diff_appn"],
            deviation_appg_count=data["diff_appg"]
        )
    )
    return response

@router.get("/traffic/accident/die",
            tags=["Client side"]
)
async def get_die_accedint(date_from: str, time_from: str) -> schemas.ClientBaseTrafficAccidentDieInfoResponse:

    response = schemas.ClientBaseTrafficAccidentDieInfoResponse(
        data=models.TrafficAccidentDieInfo(
            date_from=models.DateTime(
                date=date_from,
                time=time_from
            ),
            count=2
        )
    )
    return response