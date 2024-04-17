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