import styles from './RepairBlock.module.scss';

export default function RepairBlock() {
  return (
    <section className={styles.block}>
      <div className={styles.repair}>
        <div className={styles.repair_header}>👷‍♂️ Строительные работы и  благоустройство:</div>
        <div className={styles.repair_block}>
          <div className={styles.label}>Количество согласованных участков с ограниченным движением: 37</div>
          <div className={styles.deviation}>
            <div className={styles.deviation_element}>Отклонение от APPN: 12%</div>
            <div className={styles.deviation_element}>Отклонение от APPG: 12%</div>
          </div>
        </div>
        <div className={styles.repair_block}>
          <div className={styles.label}>Количество несогласованных участков с ограниченным движением: 27</div>
          <div className={styles.deviation}>
            <div className={styles.deviation_element}>Отклонение от APPN: 12%</div>
            <div className={styles.deviation_element}>Отклонение от APPG: 12%</div>
          </div>
        </div>
      </div>
    </section>
  )
}