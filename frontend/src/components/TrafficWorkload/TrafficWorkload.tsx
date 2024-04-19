import styles from "./TrafficWorkload.module.scss";
import trafficLightRedIcon from '../../static/icons/traffic-light-red.png';
import trafficLightYellowIcon from '../../static/icons/traffic-light-yellow.png';
import trafficLightGreenIcon from '../../static/icons/traffic-light-green.png';
import { getNoun } from '../../utils/getNoun';

interface ITrafficWorkloadProps {
  points: number;
  nearest_points: number;
  nearest_time: string;
}

export default function TrafficWorkload(props: ITrafficWorkloadProps) {
  return (
    <div className={styles.workload}>
      <img
        className={styles.light}
        src={
          props.points >= 0 && props.points <= 4
            ? trafficLightGreenIcon
            : props.points > 4 && props.points <= 7
            ? trafficLightYellowIcon
            : props.points > 7 && props.points <= 10
            ? trafficLightRedIcon
            : ""
        }
        alt=""
      />
      <div className={styles.points}>
        {props.points} {getNoun(props.points, "балл", "балла", "баллов")}
      </div>
      <div className={styles.prediction}>{props.nearest_time}: {props.nearest_points} {getNoun(props.points, "балл", "балла", "баллов")}</div>
    </div>
  );
}
