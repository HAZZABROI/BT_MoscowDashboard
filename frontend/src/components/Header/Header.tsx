import styles from './Header.module.scss';
import deptransIcon from '../../static/icons/deptrans.png';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={deptransIcon} alt="" className={styles.icon} />
      <div className={styles.header_text}>Дашборд Московского транспорта</div>
    </header>
  )
}