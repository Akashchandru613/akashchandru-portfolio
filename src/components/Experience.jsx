import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '../data/index'
import styles from './Experience.module.css'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="experience" className="section-wrapper" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Where I've worked</p>
        <h2 className="section-title">Work <span>Experience</span></h2>
      </motion.div>

      <div className={styles.timeline}>
        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            className={styles.item}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className={styles.dot} />
            <motion.div
              className={styles.card}
              whileHover={{ x: 5, borderColor: 'rgba(129,140,248,0.45)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={styles.header}>
                <div>
                  <h3 className={styles.company}>{job.company}</h3>
                  <p className={styles.role}>{job.role}</p>
                  <p className={styles.location}>{job.location}</p>
                </div>
                <span className={styles.period}>{job.period}</span>
              </div>

              <ul className={styles.points}>
                {job.points.map((p, j) => (
                  <li key={j} className={styles.point}>
                    <span className={styles.pointDot} />
                    {p}
                  </li>
                ))}
              </ul>

              <div className={styles.techStack}>
                {job.tech.map(t => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
