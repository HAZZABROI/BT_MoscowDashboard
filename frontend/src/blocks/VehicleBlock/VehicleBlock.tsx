import styles from './VehicleBlock.module.scss';
import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';
import Trend from '../../components/Trend/Trend';
import { IVehicle, IVehicleType } from '../../static/types/IVehicle';

const vehicleExample: IVehicleType = {
  date: {
    date: "2024-12-04",
    time: "13:00",
  },
  count: 123,
  trend: 'down',
  deviation_appn_count: 0.6,
  deviation_appg_count: 0.4,
}

export default function VehicleBlock() {

  const [vehicle, setVehicle] = useState<IVehicle>();

  const [selectedVehicle, setSelectedVehicle] = useState<string>('taxi');
  const [currentVehicleData, setCurrentVehicleData] = useState(vehicle ? vehicle.infoTaxi : vehicleExample);

  useEffect(() => {
    if (vehicle) {
      if (selectedVehicle === "taxi") {
        setCurrentVehicleData(vehicle.infoTaxi);
      } else if (selectedVehicle === "carsharing") {
        setCurrentVehicleData(vehicle.infoCarsharing);
      } else if (selectedVehicle === "ngpt") {
        setCurrentVehicleData(vehicle.infoNGPT);
      }
    }
  }, [selectedVehicle, vehicle]);


  useEffect(() => {
    fetch('http://82.97.250.132:8000/server/transport/info')
    .then(res => res.json())
    .then(data => {
      setVehicle(data.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    vehicle
    ?
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
          <option value='taxi'>🚕 Такси</option>
          <option value='carsharing'>🚗 Каршеринг</option>
          <option value='ngpt'>🚌 НГПТ</option>
        </select>
        <div className={styles.stat_block}>
          <div className={styles.stat_param} style={{width: 'auto'}}><span className={styles.amount}>{currentVehicleData.count}</span></div>
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
    :
    ''
  );
}
