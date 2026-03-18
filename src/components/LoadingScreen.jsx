import { motion } from 'framer-motion'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  return (
    <motion.div
      className={styles.screen}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className={styles.content}>
        <motion.div
          className={styles.logo}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
        >
          AC
        </motion.div>
        <motion.p
          className={styles.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Akash Chandru
        </motion.p>
        <div className={styles.barTrack}>
          <motion.div
            className={styles.bar}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </div>
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Building something awesome...
        </motion.p>
      </div>
    </motion.div>
  )
}
