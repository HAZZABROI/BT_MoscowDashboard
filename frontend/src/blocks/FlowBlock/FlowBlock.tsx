import { IFlow, IFlowType } from '../../static/types/IFlow';
import styles from './FlowBlock.module.scss';
import { useEffect, useState } from 'react';

export default function FlowBlock() {

  const [flow, setFlow] = useState<IFlow>();

  const [currentFlow, setCurrentFlow] = useState<IFlowType>();

  const [selectedVehicle, setSelectedVehicle] = useState<string>('metro');

  useEffect(() => {
    fetch('http://82.97.250.132:8000/server/passagr/traffic')
      .then((res) => res.json())
      .then((data) => {
        const newFlow: IFlow = {
          info_ngpt: {
            yesterday: 0,
            '2weeks_ago': 0,
            deviation: 0,
          },
          info_suburban_trains: {
            yesterday: 0,
            '2weeks_ago': 0,
            deviation: 0,
          },
          info_taxi: {
            yesterday: 0,
            '2weeks_ago': 0,
            deviation: 0,
          },
          info_carsharing: {
            yesterday: 0,
            '2weeks_ago': 0,
            deviation: 0,
          },
          info_electrosuda: {
            yesterday: 0,
            '2weeks_ago': 0,
            deviation: 0,
          },
          info_personal: {
            yesterday: 0,
            '2weeks_ago': 0,
            deviation: 0,
          },
          info_metro: {
            yesterday: 0,
            '2weeks_ago': 0,
            deviation: 0,
          },
        };
        const oldFlow = data.data;

        newFlow.info_ngpt = {
          yesterday: oldFlow.info_ngpt.ngpt_yesterday,
          '2weeks_ago': oldFlow.info_ngpt.ngpt_2weeks_ago,
          deviation: oldFlow.info_ngpt.daviation,
        };

        newFlow.info_suburban_trains = {
          yesterday: oldFlow.infa_surban_trains.suburban_trains_yesterday,
          '2weeks_ago': oldFlow.infa_surban_trains.suburban_trains_2weeks_ago,
          deviation: oldFlow.infa_surban_trains.daviation,
        };

        newFlow.info_taxi = {
          yesterday: oldFlow.infa_taxi.taxi_yesterday,
          '2weeks_ago': oldFlow.infa_taxi.taxi_2weeks_ago,
          deviation: oldFlow.infa_taxi.daviation,
        };

        newFlow.info_carsharing = {
          yesterday: oldFlow.infa_carshering.carshering_yesterday,
          '2weeks_ago': oldFlow.infa_carshering.carshering_2weeks_ago,
          deviation: oldFlow.infa_carshering.daviation,
        };

        newFlow.info_electrosuda = {
          yesterday: oldFlow.infa_electrosuda.electrosuda_yesterday,
          '2weeks_ago': oldFlow.infa_electrosuda.electrosuda_2weeks_ago,
          deviation: oldFlow.infa_electrosuda.daviation,
        };

        newFlow.info_personal = {
          yesterday: oldFlow.info_personal.personal_yesterday,
          '2weeks_ago': oldFlow.info_personal.personal_2weeks_ago,
          deviation: oldFlow.info_personal.daviation,
        };

        newFlow.info_metro = {
          yesterday: oldFlow.info_metro.metro_yesterday,
          '2weeks_ago': oldFlow.info_metro.metro_2weeks_ago,
          deviation: oldFlow.info_metro.daviation,
        };

        setFlow(newFlow);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {

    if (flow) {
      switch (selectedVehicle) {
        case 'metro':
          setCurrentFlow(flow.info_metro);
          break;
        case 'ngpt':
          setCurrentFlow(flow.info_ngpt);
          break;
        case 'personal':
          setCurrentFlow(flow.info_personal);
          break;
        case 'suburban_trains':
          setCurrentFlow(flow.info_suburban_trains);
          break;
        case 'taxi':
          setCurrentFlow(flow.info_taxi);
          break;
        case 'carsharing':
          setCurrentFlow(flow.info_carsharing);
          break;
        case 'electrosuda':
          setCurrentFlow(flow.info_electrosuda);
          break;

        default:
          break;
      }
    }

  }, [flow, selectedVehicle]);

  return (flow && currentFlow) ? (
    <section className={styles.block}>
      <header className={styles.header}>🚌 Пассажиропоток на транспорте</header>
      <label className={styles.label}>Выберите ТС</label>
      <select
        className={styles.select}
        onChange={(evt) => setSelectedVehicle(evt.target.value)}
      >
        <option value='metro'>🚆 Метро + МЦК</option>
        <option value='ngpt'>🚌 НГПТ</option>
        <option value='trains'>🚂 Пригородные поезда</option>
        <option value='taxi'>🚕 Такси</option>
        <option value='carsharing'>🚗 Каршеринг</option>
        <option value='personal'>🚙 Личный транспорт</option>
        <option value='electrosuda'>🚢 Электросуда</option>
      </select>
      <div className={styles.flow}>
        <div className={styles.flow_param}>
          <span className={styles.amount}>{currentFlow.yesterday}</span> пассажиров за вчера
        </div>
        <div className={styles.flow_param}>
          <span className={styles.amount}>{currentFlow['2weeks_ago']}</span> пассажиров две недели
          назад
        </div>
        <div className={styles.flow_param}>Отклонение: {currentFlow.deviation}%</div>
      </div>
    </section>
  ) : (
    ''
  );
}
