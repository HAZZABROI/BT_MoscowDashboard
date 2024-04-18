import { IEvent } from '../../static/types/IEvent';
import styles from './EventsBlock.module.scss';
import { useState, useEffect } from 'react';

export default function EventsBlock() {

  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    fetch('http://82.97.250.132:8000/server/miningful/event')
    .then(res => res.json())
    .then(data => {
      setEvents(data.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    events.length > 0
    ?
    <section className={styles.block}>
      <div className={styles.header}>💥 Значимые события</div>
      <div className={styles.events}>
        <div className={styles.events_header}>
          <span className={styles.header_element}>Время</span>
          <span className={styles.header_element}>Место</span>
          <span className={styles.header_element + ' ' + styles.element_description}>Описание</span>
        </div>
        <div className={styles.events_list}>
            {
              events.map((event, index) => (
                <div className={styles.list_item} key={index}>
                  <span className={styles.item_element}>{event.time.time}</span>
                  <span className={styles.item_element}>{event.adress}</span>
                  <span className={styles.item_element + ' ' + styles.item_description}>{event.event_describtion}</span>
                </div>
              ))
            }
        </div>
      </div>
    </section>
    :
    ''
  )
}