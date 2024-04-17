import styles from './VehicleBlock.module.scss';
import Plot from 'react-plotly.js';
import { useState } from 'react';

export default function VehicleBlock() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('taxi');

  return (
    <section className={styles.block}>
      <header className={styles.header}>🚕 ТС на Улично-Дорожной Сети</header>
      <div className={styles.stats}>
        <div className={styles.stat_block}>
          <div className={styles.stat_param}>Уникальные ТС: 123</div>
          <div className={styles.stat_trend + ' ' + styles.green}>
            Тренд: вверх
          </div>
          <div className={styles.stat_param}>Отклонение от APPN: 12%</div>
          <div className={styles.stat_param}>Отклонение от APPG: 12%</div>
          <div className={styles.stat_param}>Прогноз до конца дня: 123</div>
        </div>
        <label className={styles.label}>Выберите ТС</label>
        <select
          className={styles.select}
          onChange={(evt) => setSelectedVehicle(evt.target.value)}
        >
          <option value='taxi'>Такси</option>
          <option value='carsharing'>Каршеринг</option>
          <option value='ngpt'>НГПТ</option>
        </select>
        <div className={styles.stat_block}>
          <div className={styles.stat_param}>Количество: 576</div>
          <div className={styles.stat_trend + ' ' + styles.green}>
            Тренд: вверх
          </div>
          <div className={styles.stat_param}>Отклонение от APPN: 12%</div>
          <div className={styles.stat_param}>Отклонение от APPG: 12%</div>
        </div>
      </div>
      <div className={styles.plot_wrapper}>
        <Plot
          data={[
            { type: 'pie', labels: ["Такси", "Каршеринг", "НГПТ"], values: [2, 3, 4]},
          ]}
          layout={{ width: "100%", title: 'ТС на Улично-Дорожной Сети' }}
          className={styles.plot}
        />
      </div>
    </section>
  );
}
