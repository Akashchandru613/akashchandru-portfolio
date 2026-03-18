import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { testimonials } from '../data/index'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next) => {
    setDir(next > active ? 1 : -1)
    setActive(next)
  }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit:  (d) => ({ opacity: 0, x: d * -60 }),
  }

  const t = testimonials[active]

  return (
    <section id="testimonials" className="section-wrapper" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">What people say</p>
        <h2 className="section-title">Testimonials & <span>Recommendations</span></h2>
      </motion.div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className={styles.quoteIcon}>"</div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            className={styles.inner}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.text}>{t.text}</p>
            <div className={styles.author}>
              <div className={styles.avatar} style={{ background: `${t.color}33`, border: `1px solid ${t.color}55`, color: t.color }}>
                {t.avatar}
              </div>
              <div>
                <p className={styles.name}>{t.name}</p>
                <p className={styles.role}>{t.role} · {t.company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={() => go((active - 1 + testimonials.length) % testimonials.length)}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === active ? styles.dotActive : ''}`} onClick={() => go(i)} />
            ))}
          </div>
          <button className={styles.navBtn} onClick={() => go((active + 1) % testimonials.length)}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
