import { useEffect, useState } from 'react';
import { IRepair } from '../../static/types/IRepair';
import styles from './RepairBlock.module.scss';

export default function RepairBlock() {

  const [repair, setRepair] = useState<IRepair>();

  useEffect(() => {
    fetch('/server/constructions/info')
    .then(res => res.json())
    .then(data => {
      setRepair(data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    repair
    ?
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
    :
    ''
  )
}