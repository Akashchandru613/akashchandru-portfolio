import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>AC</div>
        <p className={styles.copy}>
          Designed & built by <span>Akash Chandru</span> · {new Date().getFullYear()}
        </p>
        <p className={styles.built}>Built with React + Vite + Framer Motion</p>
      </div>
    </footer>
  )
}
