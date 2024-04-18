interface IWeatherData {
  status_weather: 'облачно' | 'небольшой дождь' | 'дождь' | 'дождь со снегом',
  temperature: number,
}

export interface IWeather {
  now: IWeatherData;
  nearest: IWeatherData[];
}