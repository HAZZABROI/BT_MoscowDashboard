import styles from './EventsBlock.module.scss';

export default function EventsBlock() {
  return (
    <section className={styles.block}>
      <div className={styles.header}>💥 Значимые события</div>
      <div className={styles.events}>
        <div className={styles.events_header}>
          <span className={styles.header_element}>Время</span>
          <span className={styles.header_element}>Место</span>
          <span className={styles.header_element + ' ' + styles.element_description}>Описание</span>
        </div>
        <div className={styles.events_list}>
          <div className={styles.list_item}>
            <span className={styles.item_element}>10:00</span>
            <span className={styles.item_element}>Образцова 9 стр.2</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Официальное открытие Хакатона «Битве тITанов»</span>
          </div>
          <div className={styles.list_item}>
            <span className={styles.item_element}>10:00</span>
            <span className={styles.item_element}>Образцова 9 стр.2</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Официальное открытие Хакатона «Битве тITанов»</span>
          </div>
          <div className={styles.list_item}>
            <span className={styles.item_element}>10:00</span>
            <span className={styles.item_element}>Образцова 9 стр.2</span>
            <span className={styles.item_element + ' ' + styles.item_description}>Официальное открытие Хакатона «Битве тITанов»</span>
          </div>
        </div>
      </div>
    </section>
  )
}