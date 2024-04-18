import styles from './DownloadBtn.module.scss';
import generatePDF from 'react-to-pdf';
import pdfIcon from '../../static/icons/pdf.svg';

interface IDownloadBtnProps {
  globalRef: React.RefObject<HTMLElement>
}

export default function DownloadBtn(props: IDownloadBtnProps) {
  return (
    <button className={styles.btn} onClick={() => generatePDF(props.globalRef, {filename: 'report.pdf'})}>
      <img src={pdfIcon} alt="" className={styles.btn_icon} />
      <span className={styles.btn_text}>Скачать отчёт в pdf</span>
    </button>
  )
}