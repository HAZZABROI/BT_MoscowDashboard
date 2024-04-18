import styles from './AccidentBlock.module.scss';
import Trend from '../../components/Trend/Trend';
import { IAccidentInfo, IAccidentDie, IAccident } from '../../static/types/IAccidentInfo';
import { useState, useEffect } from 'react';

const accidentDie: IAccidentDie = {
  date_from: {
    date: '2024-04-17',
    time: '13:00',
  },
  count: 7,
}

export default function AccidentBlock() {

  const [accidentInfo, setAccidentInfo] = useState<IAccidentInfo>();
  const [accidents, setAccidents] = useState<IAccident[]>();

  useEffect(() => {
    fetch('http://82.97.250.132:8000/server/traffic/accident')
    .then(res => res.json())
    .then(data => {
      setAccidentInfo(data.data);
    })
    .catch(err => {
      console.log(err);
    });

    fetch('http://82.97.250.132:8000/server/miningful/accident')
    .then(res => res.json())
    .then(data => {
      setAccidents(data.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    (accidents && accidentInfo) ?
    <section className={styles.block}>
    <header className={styles.header}>📛 ДТП</header>
    <div className={styles.accident_stats}>
      <div className={styles.stats}>
        <div className={styles.stats_param}>
          <span className={styles.amount + (accidentInfo.count > 5 ? ' ' + styles.warning : '')}>{accidentInfo.count}</span> ДТП
        </div>
        <Trend trend={accidentInfo.trend} />
        <div className={styles.stat_param}>Отклонение от APPN: {accidentInfo.deviation_appn_count}%</div>
        <div className={styles.stat_param}>Отклонение от APPG: {accidentInfo.deviation_appg_count}%</div>
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
          {
            accidents?.map((accident, index) => (
              <li className={styles.list_item} key={index}>
                <span className={styles.item_element}>{accident.time.time}</span>
                <span className={styles.item_element}>{accident.adress}</span>
                <span className={styles.item_element + ' ' + styles.item_description}>{accident.describtion}</span>
                <span className={styles.item_element}>{accident.time_gubdd} мин</span>
              </li>
            ))
          }
        </ul>
    </div>
  </section>
  :
  ''
  )
}