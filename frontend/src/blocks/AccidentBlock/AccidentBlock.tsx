import styles from './AccidentBlock.module.scss';

export default function AccidentBlock() {
  return (
    <section className={styles.block}>
      <header className={styles.header}>📛 ДТП</header>
      <div className={styles.accident_stats}>
        <div className={styles.stats}>
          <div className={styles.stats_param}>Число ДТП: 123</div>
          <div className={styles.stats_trend + ' ' + styles.red}>Тренд: вниз</div>
          <div className={styles.stat_param}>Отклонение от APPN: 12%</div>
          <div className={styles.stat_param}>Отклонение от APPG: 12%</div>
        </div>
        <div className={styles.died}>
          <div className={styles.died_header}>💀 Число погибших в ДТП с начала дня:</div>
          <div className={styles.died_amount}>12</div>
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
          <li className={styles.list_item}>
            <span className={styles.item_element}>7:45</span>
            <span className={styles.item_element}>ш. Энтузиастов, д. 22</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Водитель, по причине неисправности ДВС совершил вынужденную остановку в первой полосе движения.</span>
            <span className={styles.item_element}>10 мин</span>
          </li>
          <li className={styles.list_item}>
            <span className={styles.item_element}>7:45</span>
            <span className={styles.item_element}>ш. Энтузиастов, д. 22</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Водитель, по причине неисправности ДВС совершил вынужденную остановку в первой полосе движения.</span>
            <span className={styles.item_element}>10 мин</span>
          </li>
          <li className={styles.list_item}>
            <span className={styles.item_element}>7:45</span>
            <span className={styles.item_element}>ш. Энтузиастов, д. 22</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Водитель, по причине неисправности ДВС совершил вынужденную остановку в первой полосе движения.</span>
            <span className={styles.item_element}>10 мин</span>
          </li>
        </ul>
      </div>
    </section>
  )
}