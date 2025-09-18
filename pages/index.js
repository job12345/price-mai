import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CocoonCalculator from '../components/CocoonCalculator'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ระบบคำนวณไหม - อัครพงษ์ฟาร์ม</title>
        <meta name="description" content="ระบบคำนวณ % ไหม และราคาซื้อ - อัครพงษ์ ฟาร์ม" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CocoonCalculator />
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} อัครพงษ์ฟาร์ม - ระบบคำนวณไหม เวอร์ชัน 1.0
      </footer>
    </div>
  )
}
