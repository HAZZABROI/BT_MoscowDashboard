import styles from './Trend.module.scss';

import arrowDownIcon from '../../static/icons/arrow-down.png';
import arrowUpIcon from '../../static/icons/arrow-up.png';

export interface ITrendProps {
  trend: 'up'|'down'|'no_diff'
}

export default function Trend(props: ITrendProps) {
  return (
    <div className={styles.trend}>
      {
        props.trend === 'no_diff' ?
        ''
        :
        <img src={props.trend === "up" ? arrowUpIcon : props.trend === "down" ? arrowDownIcon : ''} alt="" className={styles.trend_icon} />
      }
    </div>
  )
}