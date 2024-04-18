import styles from './AccidentBlock.module.scss';
import Trend from '../../components/Trend/Trend';
import { IAccident, IAccidentDie } from '../../static/types/IAccident';

const accident: IAccident = {
  count: 13,
  trend: 'no_diff',
  deviation_appn_count: 12,
  deviation_appg_count: 21,
}

const accidentDie: IAccidentDie = {
  date_from: {
    date: '2024-04-17',
    time: '13:00',
  },
  count: 7,
}

export default function AccidentBlock() {
  return (
    <section className={styles.block}>
      <header className={styles.header}>📛 ДТП</header>
      <div className={styles.accident_stats}>
        <div className={styles.stats}>
          <div className={styles.stats_param}>
            <span className={styles.amount + (accident.count > 5 ? ' ' + styles.warning : '')}>{accident.count}</span> ДТП
          </div>
          <Trend trend={accident.trend} />
          <div className={styles.stat_param}>Отклонение от APPN: {accident.deviation_appn_count}%</div>
          <div className={styles.stat_param}>Отклонение от APPG: {accident.deviation_appg_count}%</div>
        </div>
        <div className={styles.died}>
          <div className={styles.died_amount + (accidentDie.count > 5 ? ' ' + styles.warning : '')}>{accidentDie.count}</div>
          <div className={styles.died_header}>💀 Число погибших в ДТП с начала дня</div>
        </div>
      </div>
      <header className={styles.important_accidents_header}>Значимые ДТП:</header>
      <div className={styles.important_accidents}>
        <header className={styles.list_header}>
          <span className={styles.header_element}>Время</span>
          <span className={styles.header_element}>Место</span>
          <span className={styles.header_element + ' ' + styles.element_description}>Описание</span>
          <span className={styles.header_element}>Время реагирования</span>
        </header>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <span className={styles.item_element}>7:45</span>
            <span className={styles.item_element}>ш. Энтузиастов, д. 22</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Водитель, по причине неисправности ДВС совершил вынужденную остановку в первой полосе движения.</span>
            <span className={styles.item_element}>10 мин</span>
          </li>
          <li className={styles.list_item}>
            <span className={styles.item_element}>7:45</span>
            <span className={styles.item_element}>ш. Энтузиастов, д. 22</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Водитель, по причине неисправности ДВС совершил вынужденную остановку в первой полосе движения.</span>
            <span className={styles.item_element}>10 мин</span>
          </li>
          <li className={styles.list_item}>
            <span className={styles.item_element}>7:45</span>
            <span className={styles.item_element}>ш. Энтузиастов, д. 22</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Водитель, по причине неисправности ДВС совершил вынужденную остановку в первой полосе движения.</span>
            <span className={styles.item_element}>10 мин</span>
          </li>
        </ul>
      </div>
    </section>
  )
}