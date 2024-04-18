import { IFlow } from '../../static/types/IFlow';
import styles from './FlowBlock.module.scss';
import { useEffect, useState } from 'react';

export default function FlowBlock() {

  const [flow, setFlow] = useState<IFlow>();

  const [selectedVehicle, setSelectedVehicle] = useState<string>("metro");

  useEffect(() => {
    fetch('http://82.97.250.132:8000/server/passagr/traffic')
    .then(res => res.json())
    .then(data => {
      // let newFlow = {};
      setFlow(data.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, [selectedVehicle]);

  return (
    flow
    ?
    <section className={styles.block}>
      <header className={styles.header}>🚌 Пассажиропоток на транспорте</header>
      <label className={styles.label}>Выберите ТС</label>
      <select
          className={styles.select}
          onChange={(evt) => setSelectedVehicle(evt.target.value)}
        >
          <option value='metro'>Метро + МЦК</option>
          <option value='ngpt'>НГПТ</option>
          <option value='trains'>Пригородные поезда</option>
          <option value='taxi'>Такси</option>
          <option value='carsharing'>Каршеринг</option>
          <option value='personal'>Личный транспорт</option>
          <option value='electroships'>Электросуда</option>
      </select>
      <div className={styles.flow}>
        <div className={styles.flow_param}><span className={styles.amount}>{1234}</span> пассажиров за вчера</div>
        <div className={styles.flow_param}><span className={styles.amount}>127890</span> пассажиров две недели назад</div>
        <div className={styles.flow_param}>Отклонение: 2%</div>
      </div>
    </section>
    :
    ''
  )
}