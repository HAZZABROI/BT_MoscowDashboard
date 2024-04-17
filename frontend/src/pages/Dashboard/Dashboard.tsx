import styles from './Dashboard.module.scss';
import Header from './../../components/Header/Header';
import StatusBlock from './../../blocks/StatusBlock/StatusBlock';

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <StatusBlock />
      </main>
    </>
  )
}