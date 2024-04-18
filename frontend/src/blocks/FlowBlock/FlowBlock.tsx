import styles from './FlowBlock.module.scss';
import { useState } from 'react';

export default function FlowBlock() {

  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  return (
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
        <div className={styles.flow_param}><span className={styles.amount}>127896</span> пассажиров за вчера</div>
        <div className={styles.flow_param}><span className={styles.amount}>127890</span> пассажиров две недели назад</div>
        <div className={styles.flow_param}>Отклонение: 2%</div>
      </div>
    </section>
  )
}