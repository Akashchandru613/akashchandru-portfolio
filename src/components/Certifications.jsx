import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { certifications } from '../data/index'
import styles from './Certifications.module.css'

export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="certifications" className="section-wrapper" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Credentials</p>
        <h2 className="section-title">Certifications & <span>Learning</span></h2>
      </motion.div>

      <div className={styles.grid}>
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            className={styles.card}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -5, borderColor: `${cert.color}55` }}
          >
            <div className={styles.top}>
              <div className={styles.icon} style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}33` }}>
                {cert.icon}
              </div>
              <span
                className={`${styles.status} ${cert.status === 'Completed' ? styles.completed : styles.inProgress}`}
              >
                {cert.status === 'Completed' ? '✓ ' : '⟳ '}{cert.status}
              </span>
            </div>
            <h3 className={styles.name}>{cert.name}</h3>
            <p className={styles.issuer}>{cert.issuer}</p>
            <p className={styles.date}>{cert.date}</p>
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                style={{ background: cert.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: cert.status === 'Completed' ? '100%' : '60%' } : {}}
                transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
