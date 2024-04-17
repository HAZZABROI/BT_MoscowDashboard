import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_text}>Дашборд Московского транспорта</div>
    </header>
  )
}