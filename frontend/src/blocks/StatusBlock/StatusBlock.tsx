import styles from './StatusBlock.module.scss';
import cloudIcon from '../../static/icons/cloud.svg';

const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

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
              <div className={styles.light} />
              <div className={styles.points}>4 балла</div>
            </div>
            <div className={styles.prediction}>Вечер: 9 баллов</div>
          </div>
          <div className={styles.workload_top}>
            <div className={styles.top_header}>Топ-3 самые загруженные магистрали:</div>
            <div className={styles.top_element}></div>
          </div>
        </div>
      </div>
      <div className={styles.status}>
        <div className={styles.date}>
          <div className={styles.date_time}>{`${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`}</div>
          <div className={styles.date_day}>{date.toLocaleString('ru-RU', { day: 'numeric', month: 'long' })}, {days[date.getDay()]}</div>
        </div>
        <div className={styles.weather}>
          <img src={cloudIcon} alt="" className={styles.cloud} />
          <div className={styles.weather_status}>Пасмурно</div>
          <div className={styles.weather_temp}>8°C</div>
          <div className={styles.weather_prediction}>Вечером: +5°C, пасмурно</div>
        </div>
      </div>
    </section>
  )
}