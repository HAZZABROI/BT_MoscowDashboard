import styles from './Trend.module.scss';

import arrowDownIcon from '../../static/icons/arrow-down.svg';
import arrowUpIcon from '../../static/icons/arrow-up.svg';

export interface ITrendProps {
  trend: 'up'|'down'|'no_diff'
}

export default function Trend(props: ITrendProps) {
  return (
    <div className={styles.trend}>
      {/* <div className={styles.trend_label}>Тренд</div> */}
      {/* {
        props.trend === 'no_diff' ?
        ': без изменений'
        :
      } */}
      <img src={props.trend === "up" ? arrowUpIcon : props.trend === "down" ? arrowDownIcon : ''} alt="" className={styles.trend_icon} />
    </div>
  )
}