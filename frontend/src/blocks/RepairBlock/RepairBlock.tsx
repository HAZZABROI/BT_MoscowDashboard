import { IRepair } from '../../static/types/IRepair';
import styles from './RepairBlock.module.scss';

const repair: IRepair = {
  "date": {
    "date": "2024-04-17",
    "time": "13:00"
  },
  "unknownWorksList": [
    {
      "date": {
        "date": "2024-04-17",
        "time": "13:00"
      },
      "count": 20,
      "deviation_appn_count": 23,
      "deviation_appg_count": 11
    }
  ],
  "approvedWorkList": [
    {
      "date": {
        "date": "2024-04-17",
        "time": "13:00"
      },
      "count": 20,
      "deviation_appn_count": 23,
      "deviation_appg_count": 11
    }
  ]
}

export default function RepairBlock() {
  return (
    <section className={styles.block}>
      <div className={styles.repair}>
        <div className={styles.repair_header}>👷‍♂️ Строительные работы и  благоустройство:</div>
        <div className={styles.repair_block}>
          <div className={styles.label}>Количество согласованных участков с ограниченным движением: {repair.approvedWorkList[0].count}</div>
          <div className={styles.deviation}>
            <div className={styles.deviation_element}>Отклонение от APPN: {repair.approvedWorkList[0].deviation_appn_count}%</div>
            <div className={styles.deviation_element}>Отклонение от APPG: {repair.approvedWorkList[0].deviation_appg_count}%</div>
          </div>
        </div>
        <div className={styles.repair_block}>
          <div className={styles.label}>Количество несогласованных участков с ограниченным движением: {repair.unknownWorksList[0].count}</div>
          <div className={styles.deviation}>
            <div className={styles.deviation_element}>Отклонение от APPN: {repair.unknownWorksList[0].deviation_appn_count}%</div>
            <div className={styles.deviation_element}>Отклонение от APPG: {repair.unknownWorksList[0].deviation_appg_count}%</div>
          </div>
        </div>
      </div>
    </section>
  )
}