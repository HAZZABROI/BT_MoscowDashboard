import styles from './Header.module.scss';
import DownloadBtn from './../DownloadBtn/DownloadBtn';

interface IHeaderProps {
  globalRef: React.RefObject<HTMLElement>
}

export default function Header(props: IHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header_text}>Дашборд Московского транспорта</div>
      <DownloadBtn globalRef={props.globalRef} />
    </header>
  )
}