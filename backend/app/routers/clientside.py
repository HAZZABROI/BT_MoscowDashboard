from fastapi import APIRouter, Header, HTTPException

from typing import Annotated, Dict
from app.data import models, schemas
from datetime import datetime, timedelta
from app.generators import data_getter

router = APIRouter(prefix="/server", tags=["Client side"])

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

@router.get("/workload",
            tags=["Client side"]
)
async def get_workload() -> schemas.ClientBaseWorkloadResponse:

    data = data_getter.get_workload_info()
    
    top_list = []

    for i in data["top_list"]:
        top_list.append(
            models.WorkloadHW(
                date=models.DateTime(
                    date=i["date"]["date"],
                    time=i["date"]["time"]
                ),
                nameHW=i["nameHW"],
                direction=i["direction"],
                top=i["top"]
            )
        )

    response = schemas.ClientBaseWorkloadResponse(
        data=models.Workload(
            date=models.DateTime(
                date=data["top_list"][0]["date"]["date"],
                time=data["top_list"][0]["date"]["time"]
            ),
            score=data["score"],
            nearest=data["nearest"],
            lenght_jam=data["lenght_jam"],
            trend_jam=data["trend_jam"],
            trend_time=data["trend_time"],
            deviation_appn_jam=data["deviation_appn_jam"],
            deviation_appg_jam=data["deviation_appg_jam"],
            deviation_appg_driving=data["deviation_appg_driving"],
            deviation_appn_driving=data["deviation_appn_driving"],
            driving_time_min=data["driving_time_min"],
            top_list=top_list
        )
    )
    return response

@router.get("/transport/info",
            tags=["Client side"]
)
async def get_transport_info() -> schemas.ClientBaseTransportInfoResponse:
    
    data = data_getter.get_transport_info()

    summ = 0
    given_datetime = datetime.strptime(data["date"]["time"], "%H:%M")
    new_datetime = given_datetime + timedelta(hours=1)
    for vehicle_type, count in data["next_hour_forecast"].items():
        summ += count

    response = schemas.ClientBaseTransportInfoResponse(
        data=models.TransportInfo(
            date=models.DateTime(
                date=data["date"]["date"],
                time=data["date"]["time"]
            ),
            unic_count=data['total_vehicle_count'],
            infoTaxi=models.InfoTaxi(
                date=models.DateTime(
                    date=data["date"]["date"],
                    time=data["date"]["time"]
                ),
                count=data["trends"]["Такси"]["count"],
                trend=data["trends"]["Такси"]["trend"],
                deviation_appn_count=data["trends"]["Такси"]["deviation_appn_count"],
                deviation_appg_count=data["trends"]["Такси"]["deviation_appg_count"]
            ),
            infoNGPT=models.InfoNGPT(
                date=models.DateTime(
                    date=data["date"]["date"],
                    time=data["date"]["time"]
                ),
                count=data["trends"]["НГПТ"]["count"],
                trend=data["trends"]["НГПТ"]["trend"],
                deviation_appn_count=data["trends"]["НГПТ"]["deviation_appn_count"],
                deviation_appg_count=data["trends"]["НГПТ"]["deviation_appg_count"]
            ),
            infoCarsharing=models.InfoCarsharing(
                date=models.DateTime(
                    date=data["date"]["date"],
                    time=data["date"]["time"]
                ),
                count=data["trends"]["Каршеринг"]["count"],
                trend=data["trends"]["Каршеринг"]["trend"],
                deviation_appn_count=data["trends"]["Каршеринг"]["deviation_appn_count"],
                deviation_appg_count=data["trends"]["Каршеринг"]["deviation_appg_count"]
            ),
            nearest=[models.InfoDetailTransportNearest(
                date=models.DateTime(
                    date=data["date"]["date"],
                    time=new_datetime.strftime("%H:%M")
                ),
                count=summ
            )],
            trend=data["trend"]
        )
    )
    return response

@router.get("/constructions/info",
            tags=["Client side"]
)
async def get_construction_work() -> schemas.ClientBaseConstructionWorkResponse:
    
    data = data_getter.get_work_info()

    unknownWorksList = [models.UnknownWork(
        date=models.DateTime(
            date=data["approvedWorkList"][0]["date"]["date"],
            time=data["approvedWorkList"][0]["date"]["time"]
        ),
        count=data["unknownWorksList"][0]["count"],
        deviation_appn_count=data["unknownWorksList"][0]["deviation_appn_count"],
        deviation_appg_count=data["unknownWorksList"][0]["deviation_appg_count"]
    )]
    approvedWorkList = [models.ApprovedWork(
        date=models.DateTime(
            date=data["approvedWorkList"][0]["date"]["date"],
            time=data["approvedWorkList"][0]["date"]["time"]
        ),
        count=data["approvedWorkList"][0]["count"],
        deviation_appn_count=data["approvedWorkList"][0]["deviation_appn_count"],
        deviation_appg_count=data["approvedWorkList"][0]["deviation_appg_count"]
    )]

    response = schemas.ClientBaseConstructionWorkResponse(
        data=models.ConstructionWork(
            date=models.DateTime(
                date=data["approvedWorkList"][0]["date"]["date"],
                time=data["approvedWorkList"][0]["date"]["time"]
            ),
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
async def get_die_accident(date_from: str, time_from: str) -> schemas.ClientBaseTrafficAccidentDieInfoResponse:

    data = data_getter.get_accident_count_from(date_from + " " + time_from)

    response = schemas.ClientBaseTrafficAccidentDieInfoResponse(
        data=models.TrafficAccidentDieInfo(
            date_from=models.DateTime(
                date=date_from,
                time=time_from
            ),
            count=data["total_death_count"]
        )
    )
    return response

@router.get("/miningful/accident",
             tags=["Client side"]
)

async def get_meaningful_dtp() -> schemas.ClientBaseMeaningfulDtpResponse:

    data = data_getter.get_miningful_accident()["data"]

    data_list = []

    for i in data:
        data_list.append(models.MeaningfulDtp(
            time=models.DateTime(
                date=i["time"]["date"],
                time=i["time"]["time"]
            ),
            adress=i["adress"],
            describtion=i["describtion"],
            time_gubdd=i["time_gubdd"]
        ))

    response = schemas.ClientBaseMeaningfulDtpResponse(
        data = data_list
    )
    return response

@router.get("/miningful/event",
             tags=["Client side"]
)

async def impotent_events() -> schemas.ClientBaseImpotentEventsResponse:

    data = data_getter.get_miningful_events()["data"]

    data_list = []

    for i in data:
        data_list.append(models.ImpotentEvents(
            time=models.DateTime(
                date=i["time"]["date"],
                time=i["time"]["time"]
            ),
            adress=i["adress"],
            event_describtion=i["describtion"]
        ))

    respons = schemas.ClientBaseImpotentEventsResponse(
        data = data_list
    )
    return respons

@router.get("/passagr/traffic",
             tags=["Client side"]
)
async def passanger_traffic() -> schemas.ClientBasePassangerTrafficResponse:

    data = data_getter.get_passagir_traffic()["data"]

    response = schemas.ClientBasePassangerTrafficResponse(
        data = models.PassangerTraffic(
            info_ngpt=models.NGPT(
                ngpt_yesterday=data["info_ngpt"]["ngpt_yesterday"],
                ngpt_2weeks_ago=data["info_ngpt"]["ngpt_2weeks_ago"],
                daviation=data["info_ngpt"]["daviation"]
            ),
            infa_surban_trains=models.SurbanTrains(
                suburban_trains_yesterday=data["infa_surban_trains"]["suburban_trains_yesterday"],
                suburban_trains_2weeks_ago=data["infa_surban_trains"]["suburban_trains_2weeks_ago"],
                daviation=data["infa_surban_trains"]["daviation"]
            ),
            infa_taxi=models.Taxi(
                taxi_yesterday=data["infa_taxi"]["taxi_yesterday"],
                taxi_2weeks_ago=data["infa_taxi"]["taxi_2weeks_ago"],
                daviation=data["infa_taxi"]["daviation"]
            ),
            infa_carshering=models.Carshering(
                carshering_yesterday=data["infa_carshering"]["carshering_yesterday"],
                carshering_2weeks_ago=data["infa_carshering"]["carshering_2weeks_ago"],
                daviation=data["infa_carshering"]["daviation"]
            ),
            infa_electrosuda=models.Electrosuda(
                electrosuda_yesterday=data["infa_electrosuda"]["electrosuda_yesterday"],
                electrosuda_2weeks_ago=data["infa_electrosuda"]["electrosuda_2weeks_ago"],
                daviation=data["infa_electrosuda"]["daviation"]
            ),

        )
    )
    return response
