import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { funFacts } from '../data/index'
import styles from './About.module.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22,1,0.36,1] } }
})

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-wrapper" ref={ref}>
      <div className={styles.grid}>

        {/* Left: text */}
        <div className={styles.left}>
          <motion.p className="section-label" variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}>About me</motion.p>
          <motion.h2 className="section-title" variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            Passionate about building <span>great software</span>
          </motion.h2>

          <motion.p className={styles.bio} variants={fadeUp(0.2)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            I'm a Software Engineer with 2+ years of experience building scalable full-stack systems. Currently pursuing my MS in Computer Science at Northeastern University, I bring a blend of academic rigor and production-grade engineering to every project.
          </motion.p>

          <motion.p className={styles.bio} variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            My engineering philosophy: <span className={styles.highlight}>build for the user first, then optimize for scale</span>. I've migrated monoliths to microservices, cut latency by 40%, and shipped AI-powered platforms — all while keeping systems reliable at 99.9% uptime.
          </motion.p>

          <motion.div className={styles.currentlyBox} variants={fadeUp(0.4)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <div className={styles.currentlyHeader}>
              <span className={styles.liveIndicator} />
              Currently Building
            </div>
            <p className={styles.currentlyText}>
              An AI-powered code review tool that uses LLMs to provide context-aware suggestions, flag anti-patterns, and explain code decisions inline — helping teams ship better code faster.
            </p>
          </motion.div>

          <motion.div className={styles.learningWrap} variants={fadeUp(0.5)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <p className={styles.learningLabel}>Currently Learning</p>
            <div className={styles.learningTags}>
              {['Rust', 'WebAssembly', 'LLM Fine-tuning', 'RAG Systems', 'System Design'].map(t => (
                <span key={t} className={styles.learningTag}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: stats grid */}
        <div className={styles.right}>
          <div className={styles.statsGrid}>
            {funFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                className={styles.statCard}
                variants={fadeUp(0.1 * i)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                whileHover={{ y: -4, borderColor: 'rgba(129,140,248,0.5)' }}
              >
                <div className={styles.statValue}>{fact.value}</div>
                <div className={styles.statLabel}>{fact.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div className={styles.whatIBring} variants={fadeUp(0.5)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <p className={styles.wibTitle}>What I bring to a team</p>
            {[
              '🚀 End-to-end ownership from design to deployment',
              '📊 Data-driven decisions and performance obsession',
              '🤝 Strong collaboration and async communication',
              '🧩 Systems thinking for scalable architecture',
              '🔍 Proactive debugging and root-cause analysis',
            ].map(item => (
              <div key={item} className={styles.wibItem}>{item}</div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
