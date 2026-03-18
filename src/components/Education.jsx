import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education } from '../data/index'
import styles from './Education.module.css'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" className="section-wrapper" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Academic background</p>
        <h2 className="section-title">Education</h2>
      </motion.div>

      <div className={styles.grid}>
        {education.map((edu, i) => (
          <motion.div
            key={edu.name}
            className={styles.card}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.topBar} />
            <span className={styles.year}>{edu.year}</span>
            <h3 className={styles.name}>{edu.name}</h3>
            <p className={styles.degree}>{edu.degree}</p>
            {edu.gpa && <p className={styles.gpa}>GPA: <strong>{edu.gpa}</strong></p>}
            <p className={styles.location}>{edu.location}</p>
            {edu.courses && (
              <div className={styles.courses}>
                {edu.courses.map(c => <span key={c} className={styles.course}>{c}</span>)}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
