import pandas as pd
from datetime import datetime, timedelta


def get_weather_data():
    pd_client = pd.read_excel('app/data.xlsx')
    pd_client['dt'] = pd.to_datetime(pd_client['dt'] + ' ' + pd_client['time'])
    current_time = datetime.now()
    current_day_data = pd_client[pd_client['dt'].dt.date == current_time.date()]
    current_hour = current_time.hour
    filtered_data = current_day_data[(current_day_data['dt'].dt.hour >= current_hour) & (current_day_data['dt'].dt.hour < current_hour + 4)]
    
    return filtered_data

def get_traffic_accidents_data():
    pd_accident = pd.read_excel('app/data.xlsx', sheet_name=5)
    
    pd_accident['dt'] = pd.to_datetime(pd_accident['dt'] + ' ' + pd_accident['time'])
    
    current_time = datetime.now()
    prev_hour_data = pd_accident[(pd_accident['dt'].dt.date == current_time.date()) & (pd_accident['dt'].dt.hour == current_time.hour - 1)]
    

    current_hour_data = pd_accident[(pd_accident['dt'].dt.date == current_time.date()) & (pd_accident['dt'].dt.hour == current_time.hour)]
    
    current_accident_cnt = current_hour_data['accident_cnt'].sum()
    prev_accident_cnt = prev_hour_data['accident_cnt'].sum()
    
    diff_cnt = current_accident_cnt - prev_accident_cnt

    percent_change = (diff_cnt / prev_accident_cnt) * 100 if prev_accident_cnt != 0 else 0
    
    if diff_cnt > 0:
        trend = "up"
    elif diff_cnt == 0:
        trend = "no_diff"
    else:
        trend = "down"
    
    accident_cnt_appn = current_hour_data['accident_cnt_appn'].sum()
    accident_cnt_appg = current_hour_data['accident_cnt_appg'].sum()
    
    diff_appn = current_accident_cnt - accident_cnt_appn
    diff_appg = current_accident_cnt - accident_cnt_appg
    
    return {
        "current_accident_cnt": current_accident_cnt,
        "percent_change": percent_change,
        "trend": trend,
        "diff_appn": diff_appn,
        "diff_appg": diff_appg
    }

def get_accident_count_from(from_time: str):
    df = pd.read_excel('app/data.xlsx', sheet_name=6)
    df['dt'] = pd.to_datetime(df['dt'] + ' ' + df['time'])

    target_date_time = pd.to_datetime(from_time)

    filtered_data = df[df['dt'] <= target_date_time]

    total_death_count = filtered_data['accident_cnt'].sum()
    return {
        "target_date_time": target_date_time,
        "total_death_count": total_death_count
    }

def get_transport_info():
    df = pd.read_excel('app/data.xlsx', sheet_name=3)

    df['dt'] = pd.to_datetime(df['dt'] + ' ' + df['time'])

    target_date_time = pd.to_datetime(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    prev_hour_time = target_date_time - timedelta(hours=1)
    
    filtered_data = df[(df['dt'] <= target_date_time) & (df['dt'] >= prev_hour_time)]

    total_vehicle_cnt = filtered_data.groupby('vehicle_type_nm')['vehicle_cnt'].sum()

    total_appn_cnt = filtered_data.groupby('vehicle_type_nm')['vehicle_cnt_appn'].sum()
    total_appg_cnt = filtered_data.groupby('vehicle_type_nm')['vehicle_cnt_appg'].sum()

    deviation_appn_count = ((total_vehicle_cnt - total_appn_cnt) / total_vehicle_cnt) * 100
    deviation_appg_count = ((total_vehicle_cnt - total_appg_cnt) / total_vehicle_cnt) * 100

    deviation_appn_count = deviation_appn_count.round(2)
    deviation_appg_count = deviation_appg_count.round(2)

    next_hour_time = target_date_time + timedelta(hours=1)
    next_hour_data = df[(df['dt'] >= target_date_time) & (df['dt'] < next_hour_time)]

    prev_hour_data = df[(df['dt'] >= prev_hour_time) & (df['dt'] < target_date_time)]

    diff_cnt = total_vehicle_cnt.sum() - prev_hour_data['vehicle_cnt'].sum()

    if diff_cnt > 0:
        overall_trend = "up"
    elif diff_cnt == 0:
        overall_trend = "no_diff"
    else:
        overall_trend = "down"

    vehicle_info = {
        "date": {"date": target_date_time.date().strftime('%Y-%m-%d'), "time": target_date_time.time().replace(minute=0, second=0, microsecond=0).strftime('%H:%M')},
        "total_vehicle_count": total_vehicle_cnt.sum(),
        "trend": overall_trend,
        "trends": {},
        "next_hour_forecast": next_hour_data.groupby('vehicle_type_nm')['vehicle_cnt'].sum().to_dict()
    }

    for vehicle_type in total_vehicle_cnt.index:
        trend = "up" if total_vehicle_cnt[vehicle_type] > total_appn_cnt[vehicle_type] else "down" if total_vehicle_cnt[vehicle_type] < total_appn_cnt[vehicle_type] else "no_diff"
        vehicle_info["trends"][vehicle_type] = {
            "count": total_vehicle_cnt[vehicle_type],
            "trend": trend,
            "deviation_appn_count": deviation_appn_count[vehicle_type],
            "deviation_appg_count": deviation_appg_count[vehicle_type]
        }

    return vehicle_info

def get_work_info():

    current_date = datetime.now().strftime('%Y-%m-%d')
    current_time = datetime.now().strftime('%H:00')

    df = pd.read_excel('app/data.xlsx', sheet_name=4)
    
    df_filtered = df[(df['dt'] == current_date) & (df['time'] == current_time)]
    
    data = {
        "approvedWorkList": [],
        "unknownWorksList": []
    }

    for index, row in df_filtered.iterrows():
        date = {"date": str(row["dt"]), "time": str(row["time"])}
        if row["roadworks_nm"] == "Согласованные участки":
            approved_work = {
                "date": date,
                "count": row["roadworks_cnt"],
                "deviation_appn_count": row["roadworks_cnt_appn"],
                "deviation_appg_count": row["roadworks_cnt_appg"]
            }
            data["approvedWorkList"].append(approved_work)
        elif row["roadworks_nm"] == "Несогласованные участки":
            unknown_work = {
                "date": date,
                "count": row["roadworks_cnt"],
                "deviation_appn_count": row["roadworks_cnt_appn"],
                "deviation_appg_count": row["roadworks_cnt_appg"]
            }
            data["unknownWorksList"].append(unknown_work)
    
    return data

def get_workload_info():
    current_date = datetime.now().strftime('%Y-%m-%d')
    current_time = datetime.now().strftime('%H:00')
    
    next_hour = (datetime.now() + timedelta(hours=1)).strftime('%Y-%m-%d %H:00')
    
    df_traffic = pd.read_excel('app/data.xlsx', sheet_name=1)

    df_traffic_filtered = df_traffic[(df_traffic['dt'] == current_date) & (df_traffic['time'] == current_time)]

    forecast_score = df_traffic_filtered['trafic_score'].mean()

    if df_traffic_filtered['trafic_jam_lenght'].diff().mean() > 0:
        trend_jam = "up"
    elif df_traffic_filtered['trafic_jam_lenght'].diff().mean() == 0:
        trend_jam = "no_diff"
    else:
        trend_jam = "down"

    if df_traffic_filtered['driving_time_min'].diff().mean() > 0:
        trend_time = "up"
    elif df_traffic_filtered['driving_time_min'].diff().mean() == 0:
        trend_time = "no_diff"
    else:
        trend_time = "down"

    deviation_appn_jam = round(((df_traffic_filtered['trafic_jam_lenght_appn'] - df_traffic_filtered['trafic_jam_lenght']).mean() / df_traffic_filtered['trafic_jam_lenght'].mean()) * 100, 2)
    deviation_appg_jam = round(((df_traffic_filtered['trafic_jam_lenght_appg'] - df_traffic_filtered['trafic_jam_lenght']).mean() / df_traffic_filtered['trafic_jam_lenght'].mean()) * 100, 2)

    deviation_appn_driving = round(((df_traffic_filtered['driving_time_min_appn'] - df_traffic_filtered['driving_time_min']).mean() / df_traffic_filtered['driving_time_min'].mean()) * 100, 2)
    deviation_appg_driving = round(((df_traffic_filtered['driving_time_min_appg'] - df_traffic_filtered['driving_time_min']).mean() / df_traffic_filtered['driving_time_min'].mean()) * 100, 2)

    df_highways = pd.read_excel('app/data.xlsx', sheet_name=2)

    df_highways_filtered = df_highways[(df_highways['dt'] == current_date) & (df_highways['time'] == current_time)]

    unique_highways = df_highways_filtered['highway_nm'].unique()

    sorted_highways = []
    for highway in unique_highways:
        sorted_highways.extend(df_highways_filtered[df_highways_filtered['highway_nm'] == highway].sort_values(by='top_rang').head(1).to_dict(orient='records'))

    sorted_highways = sorted(sorted_highways, key=lambda x: x['top_rang'])

    top_highways = sorted_highways[:3]

    df_next_hour = df_traffic[(df_traffic['dt'] == next_hour.split()[0]) & (df_traffic['time'] == next_hour.split()[1])]
    next_hour_score = df_next_hour['trafic_score'].mean()

    workload = {
        "score": round(forecast_score, 2),
        "nearest": [
            {
                "date": {"date": next_hour.split()[0], "time": next_hour.split()[1]},
                "score": round(next_hour_score, 2)
            }
        ],
        "lenght_jam": round(df_traffic_filtered['trafic_jam_lenght'].mean(), 2),
        "trend_jam": trend_jam,
        "trend_time": trend_time,
        "deviation_appn_jam": deviation_appn_jam,
        "deviation_appg_jam": deviation_appg_jam,
        "driving_time_min": round(df_traffic_filtered['driving_time_min'].mean(), 2),
        "deviation_appn_driving": deviation_appn_driving,
        "deviation_appg_driving": deviation_appg_driving,
        "top_list": []
    }

    for index, highway in enumerate(top_highways, start=1):
        top_highway_data = {
            "date": {"date": current_date, "time": current_time},
            "nameHW": highway['highway_nm'],
            "direction": highway['direction_nm'],
            "top": index
        }
        workload["top_list"].append(top_highway_data)

    return workload

def get_miningful_accident():
    df = pd.read_excel('app/data.xlsx', sheet_name=7)

    json_data = []
    for index, row in df.iterrows():
        data = {
            "time": {
                "date": str(row['dt']),
                "time": str(row['time'])
            },
            "adress": row['adress'],
            "describtion": row['accident_description'],
            "time_gubdd": int(row['gbdd_time'])
        }
        json_data.append(data)

    return {"data": json_data}

def get_miningful_events():
    df = pd.read_excel('app/data.xlsx', sheet_name=8)

    json_data = []
    for index, row in df.iterrows():
        data = {
            "time": {
                "date": str(row['dt']),
                "time": str(row['time'])
            },
            "adress": row['adress'],
            "describtion": row['event_description']
        }
        json_data.append(data)

    return {"data": json_data}

def get_passagir_traffic():
    current_date = (datetime.now() - timedelta(1)).strftime('%Y-%m-%d')
    yesterday_date = (datetime.now() - timedelta(2)).strftime('%Y-%m-%d')

    df = pd.read_excel("app/data.xlsx", sheet_name=9)

    df_today = df[df['dt'] == current_date]
    df_yesterday = df[df['dt'] == yesterday_date]

    data = {
        "data": {
            "info_ngpt": {
                "ngpt_yesterday": df_yesterday.loc[df_yesterday['transport_type'] == 'Метро + МЦК', 'passengers_cnt'].values[0],
                "ngpt_2weeks_ago": df_today.loc[df_today['transport_type'] == 'Метро + МЦК', 'passengers_cnt_2_weeks_ago'].values[0],
                "daviation": round((df_yesterday.loc[df_yesterday['transport_type'] == 'Метро + МЦК', 'passengers_cnt'].values[0] - df_today.loc[df_today['transport_type'] == 'Метро + МЦК', 'passengers_cnt_2_weeks_ago'].values[0]) / df_today.loc[df_today['transport_type'] == 'Метро + МЦК', 'passengers_cnt_2_weeks_ago'].values[0] * 100, 2)
            },
            "infa_surban_trains": {
                "suburban_trains_yesterday": df_yesterday.loc[df_yesterday['transport_type'] == 'Пригородные поезда', 'passengers_cnt'].values[0],
                "suburban_trains_2weeks_ago": df_today.loc[df_today['transport_type'] == 'Пригородные поезда', 'passengers_cnt_2_weeks_ago'].values[0],
                "daviation": round((df_yesterday.loc[df_yesterday['transport_type'] == 'Пригородные поезда', 'passengers_cnt'].values[0] - df_today.loc[df_today['transport_type'] == 'Пригородные поезда', 'passengers_cnt_2_weeks_ago'].values[0]) / df_today.loc[df_today['transport_type'] == 'Пригородные поезда', 'passengers_cnt_2_weeks_ago'].values[0] * 100, 2)
            },
            "infa_taxi": {
                "taxi_yesterday": df_yesterday.loc[df_yesterday['transport_type'] == 'Такси', 'passengers_cnt'].values[0],
                "taxi_2weeks_ago": df_today.loc[df_today['transport_type'] == 'Такси', 'passengers_cnt_2_weeks_ago'].values[0],
                "daviation": round((df_yesterday.loc[df_yesterday['transport_type'] == 'Такси', 'passengers_cnt'].values[0] - df_today.loc[df_today['transport_type'] == 'Такси', 'passengers_cnt_2_weeks_ago'].values[0]) / df_today.loc[df_today['transport_type'] == 'Такси', 'passengers_cnt_2_weeks_ago'].values[0] * 100, 2)
            },
            "infa_carshering": {
                "carshering_yesterday": df_yesterday.loc[df_yesterday['transport_type'] == 'Каршеринг', 'passengers_cnt'].values[0],
                "carshering_2weeks_ago": df_today.loc[df_today['transport_type'] == 'Каршеринг', 'passengers_cnt_2_weeks_ago'].values[0],
                "daviation": round((df_yesterday.loc[df_yesterday['transport_type'] == 'Каршеринг', 'passengers_cnt'].values[0] - df_today.loc[df_today['transport_type'] == 'Каршеринг', 'passengers_cnt_2_weeks_ago'].values[0]) / df_today.loc[df_today['transport_type'] == 'Каршеринг', 'passengers_cnt_2_weeks_ago'].values[0] * 100, 2)
            },
            "infa_electrosuda": {
                "electrosuda_yesterday": df_yesterday.loc[df_yesterday['transport_type'] == 'Личный транспорт', 'passengers_cnt'].values[0],
                "electrosuda_2weeks_ago": df_today.loc[df_today['transport_type'] == 'Личный транспорт', 'passengers_cnt_2_weeks_ago'].values[0],
                "daviation": round((df_yesterday.loc[df_yesterday['transport_type'] == 'Личный транспорт', 'passengers_cnt'].values[0] - df_today.loc[df_today['transport_type'] == 'Личный транспорт', 'passengers_cnt_2_weeks_ago'].values[0]) / df_today.loc[df_today['transport_type'] == 'Личный транспорт', 'passengers_cnt_2_weeks_ago'].values[0] * 100, 2)
            },
            "infa_electrosuda": {
                "electrosuda_yesterday": df_yesterday.loc[df_yesterday['transport_type'] == 'Электросуда', 'passengers_cnt'].values[0],
                "electrosuda_2weeks_ago": df_today.loc[df_today['transport_type'] == 'Электросуда', 'passengers_cnt_2_weeks_ago'].values[0],
                "daviation": round((df_yesterday.loc[df_yesterday['transport_type'] == 'Электросуда', 'passengers_cnt'].values[0] - df_today.loc[df_today['transport_type'] == 'Электросуда', 'passengers_cnt_2_weeks_ago'].values[0]) / df_today.loc[df_today['transport_type'] == 'Электросуда', 'passengers_cnt_2_weeks_ago'].values[0] * 100, 2)
            }
        }
    }

    return data