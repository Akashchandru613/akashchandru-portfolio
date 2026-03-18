import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillGroups } from '../data/index'
import styles from './Skills.module.css'

function SkillBar({ name, level, inView, delay }) {
  return (
    <div className={styles.skillRow}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="section-wrapper" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">My toolkit</p>
        <h2 className="section-title">Technical <span>Skills</span></h2>
      </motion.div>

      <div className={styles.groupsGrid}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            className={styles.group}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: gi * 0.1 }}
          >
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon}>{group.icon}</span>
              <span className={styles.groupName}>{group.category}</span>
            </div>
            {group.skills.map((skill, si) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                inView={inView}
                delay={gi * 0.1 + si * 0.08}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
