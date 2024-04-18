import styles from './StatusBlock.module.scss';
import cloudIcon from '../../static/icons/cloud.svg';
import sunIcon from '../../static/icons/sun.svg';
import rainIcon from '../../static/icons/rain.svg';
import Trend from '../../components/Trend/Trend';
import { IWeather } from '../../static/types/IWeather';
import { IWorkload } from '../../static/types/IWorkload';
import trafficLightRedIcon from '../../static/icons/trafficlight/traffic-light-red.svg';
import trafficLightYellowIcon from '../../static/icons/trafficlight/traffic-light-yellow.svg';
import trafficLightGreenIcon from '../../static/icons/trafficlight/traffic-light-green.svg';

const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');

const weather: IWeather = {
  now: {
    status_weather: 'облачно',
    temperature: 10,
  },
  nearest: [
    {
      status_weather: 'облачно',
      temperature: 10,
    }
  ]
}

const workload: IWorkload = {
  "date": {
    "date": "2024-04-17",
    "time": "13:00"
  },
  "score": 5,
  "nearest": [
    {
      "date": {
        "date": "2024-04-17",
        "time": "13:00"
      },
      "score": 1
    }
  ],
  "lenght_jam": 126,
  "trend_jam": "up",
  "trend_time": "down",
  "deviation_appn_jam": 23,
  "deviation_appg_jam": 11,
  "driving_time_min": 12,
  "deviation_appn_driving": 23,
  "deviation_appg_driving": 11,
  "top_list": [
    {
      "date": {
        "date": "2024-04-17",
        "time": "13:00"
      },
      "nameHW": "Волоколамское шоссе",
      "direction": "из центра",
      "top": 1
    }
  ]
}
export default function StatusBlock() {

  const date = new Date();

  return (
    <section className={styles.block}>
      <header className={styles.header}>🛴 Добро пожаловать!</header>
      <div className={styles.traffic}>
        <div className={styles.traffic_workload}>
          <div className={styles.workload_header}>🚚 Загруженность</div>
          <div className={styles.workload_congection}>
            <div className={styles.congection_points}>
              <img className={styles.light} src={workload.score >= 0 && workload.score <= 4 ? trafficLightGreenIcon : workload.score > 4 && workload.score <= 7 ? trafficLightYellowIcon : workload.score > 7 && workload.score <= 10 ? trafficLightRedIcon : ''} alt="" />
              <div className={styles.points}>{workload.score} балл</div>
            </div>
            <div className={styles.prediction}>{workload.nearest[0].date.time}: {workload.nearest[0].score} балл</div>
          </div>
          <div className={styles.workload_top}>
            <div className={styles.top_header}>Топ-3 самые загруженные магистрали:</div>
            <ol className={styles.top_rating}>
              {
                workload.top_list.map((road, index) => (
                  <li key={index} className={styles.top_element}>{road.nameHW}</li>
                ))
              }
            </ol>
          </div>
        </div>
        <div className={styles.traffic_bottom}>
          <div className={styles.traffic_section}>
            <div className={styles.section_header}>Длина заторов</div>
            <div className={styles.section_data}>{workload.lenght_jam} км</div>
            <Trend trend={workload.trend_jam} />
            <div className={styles.section_deviation}>Отклонение от APPN: {workload.deviation_appn_jam}%</div>
            <div className={styles.section_deviation}>Отклонение от APPG: {workload.deviation_appg_jam}%</div>
          </div>
          <div className={styles.traffic_section}>
            <div className={styles.section_header}>Время в пути (на 10 км)</div>
            <div className={styles.section_data}>{workload.driving_time_min} мин</div>
            <Trend trend={workload.trend_time} />
            <div className={styles.section_deviation}>Отклонение от APPN: {workload.deviation_appn_driving}%</div>
            <div className={styles.section_deviation}>Отклонение от APPG: {workload.deviation_appg_driving}%</div>
          </div>
        </div>
      </div>
      <section className={styles.status_wrapper}>
        <div className={styles.status}>
          <div className={styles.date}>
            <div className={styles.date_time}>{`${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`}</div>
            <div className={styles.date_day}>{date.toLocaleString('ru-RU', { day: 'numeric', month: 'long' })}, {days[date.getDay()]}</div>
          </div>
          <div className={styles.weather}>
            <img src={weather.now.status_weather === "облачно" ? cloudIcon : weather.now.status_weather.includes('дождь') ? rainIcon : sunIcon} alt="" className={styles.weather_icon} />
            <div className={styles.weather_status}>{weather.now.status_weather}</div>
            <div className={styles.weather_temp}>{weather.now.temperature}°C</div>
            <div className={styles.weather_prediction}>Далее: {weather.nearest[0].temperature}°C, {weather.nearest[0].status_weather}</div>
          </div>
        </div>
      </section>
    </section>
  )
}