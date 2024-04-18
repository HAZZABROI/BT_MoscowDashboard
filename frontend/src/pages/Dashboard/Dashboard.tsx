import styles from './Dashboard.module.scss';
import { useRef } from 'react';
import Header from './../../components/Header/Header';
import StatusBlock from './../../blocks/StatusBlock/StatusBlock';
import RepairBlock from './../../blocks/RepairBlock/RepairBlock';
import VehicleBlock from '../../blocks/VehicleBlock/VehicleBlock';
import AccidentBlock from './../../blocks/AccidentBlock/AccidentBlock';
import EventsBlock from './../../blocks/EventsBlock/EventsBlock';
import FlowBlock from './../../blocks/FlowBlock/FlowBlock';

export default function Dashboard() {

  const ref = useRef<HTMLElement>(null);

  return (
    <div className={styles.wrapper}>
      <Header globalRef={ref} />
      <main className={styles.main} ref={ref}>
        <StatusBlock />
        <RepairBlock />
        <VehicleBlock />
        <AccidentBlock />
        <EventsBlock />
        <FlowBlock />
      </main>
    </div>
  )
}