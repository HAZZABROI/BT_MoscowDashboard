import styles from './Dashboard.module.scss';
import Header from './../../components/Header/Header';
import StatusBlock from './../../blocks/StatusBlock/StatusBlock';
import RepairBlock from './../../blocks/RepairBlock/RepairBlock';
import VehicleBlock from '../../blocks/VehicleBlock/VehicleBlock';
import AccidentBlock from './../../blocks/AccidentBlock/AccidentBlock';
import EventsBlock from './../../blocks/EventsBlock/EventsBlock';

export default function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <StatusBlock />
        <RepairBlock />
        <VehicleBlock />
        <AccidentBlock />
        <EventsBlock />
      </main>
    </div>
  )
}