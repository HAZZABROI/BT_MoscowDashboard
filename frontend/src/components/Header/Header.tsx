import styles from './Header.module.scss';
import DownloadBtn from './../DownloadBtn/DownloadBtn';
import reloadIcon from '../../static/icons/reload.svg';

interface IHeaderProps {
  globalRef: React.RefObject<HTMLElement>
}

export default function Header(props: IHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header_text}>Дашборд Московского транспорта</div>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={() => window.location.reload()}>
          <img src={reloadIcon} alt="" className={styles.btn_icon}/>
          <span className={styles.btn_text}>Обновить</span>
        </button>
        <DownloadBtn globalRef={props.globalRef} />
      </div>
    </header>
  )
}