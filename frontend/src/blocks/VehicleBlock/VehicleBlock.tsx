import styles from './VehicleBlock.module.scss';
import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';
import Trend from '../../components/Trend/Trend';
import { IVehicle } from '../../static/types/IVehicle';

const vehicle: IVehicle = {
  "date": {
    "date": "2024-04-17",
    "time": "21:00"
  },
  "unic_count": 669,
  "trend": "up",
  "nearest": [
    {
      "date": {
        "date": "2024-01-17",
        "time": "13:00",
      },
      "count": 321,
    }
  ],
  "infoTaxi": {
    "date": {
      "date": "2024-04-17",
      "time": "21:00"
    },
    "count": 123,
    "trend": "down",
    "deviation_appn_count": -0.6,
    "deviation_appg_count": -0.4
  },
  "infoCarsharing": {
    "date": {
      "date": "2024-04-17",
      "time": "21:00"
    },
    "count": 223,
    "trend": "down",
    "deviation_appn_count": -0.87,
    "deviation_appg_count": -0.47
  },
  "infoNGPT": {
    "date": {
      "date": "2024-04-17",
      "time": "21:00"
    },
    "count": 323,
    "trend": "down",
    "deviation_appn_count": -0.15,
    "deviation_appg_count": 0.23
  }
}

export default function VehicleBlock() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('taxi');
  const [currentVehicleData, setCurrentVehicleData] = useState(vehicle.infoTaxi);

  useEffect(() => {
    if (selectedVehicle === "taxi") {
      setCurrentVehicleData(vehicle.infoTaxi);
    } else if (selectedVehicle === "carsharing") {
      setCurrentVehicleData(vehicle.infoCarsharing);
    } else if (selectedVehicle === "ngpt") {
      setCurrentVehicleData(vehicle.infoNGPT);
    }
  }, [selectedVehicle]);

  return (
    <section className={styles.block}>
      <header className={styles.header}>🚕 ТС на Улично-Дорожной Сети</header>
      <div className={styles.stats}>
        <div className={styles.stat_block}>
          <div className={styles.stat_param}><span className={styles.amount}>{vehicle.unic_count}</span> уникальных ТС</div>
          <Trend trend={vehicle.trend} />
          {/* <div className={styles.stat_param}>Отклонение от APPN: 12%</div>
          <div className={styles.stat_param}>Отклонение от APPG: 12%</div> */}
          <div className={styles.stat_param}>Прогноз на {vehicle.nearest[0].date.time}: {vehicle.nearest[0].count}</div>
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
          <div className={styles.stat_param}><span className={styles.amount}>123</span></div>
          <Trend trend={currentVehicleData.trend} />
          <div className={styles.stat_param}>Отклонение от APPN: {currentVehicleData.deviation_appn_count}%</div>
          <div className={styles.stat_param}>Отклонение от APPG: {currentVehicleData.deviation_appg_count}%</div>
        </div>
      </div>
      <div className={styles.plot_wrapper}>
        <Plot
          data={[
            { type: 'pie', labels: ["Такси", "Каршеринг", "НГПТ"], values: [vehicle.infoTaxi.count, vehicle.infoCarsharing.count, vehicle.infoNGPT.count]},
          ]}
          layout={{ title: 'ТС на Улично-Дорожной Сети' }}
          className={styles.plot}
        />
      </div>
    </section>
  );
}
