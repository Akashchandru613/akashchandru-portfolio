import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../data/index'
import styles from './Projects.module.css'

function GitHubIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}

function FeaturedProject({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={styles.featured}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      whileHover={{ borderColor: `${project.color}66` }}
    >
      <div className={styles.featuredLeft}>
        <div className={styles.featuredBadge}>Featured Project</div>
        <div className={styles.featuredIcon} style={{ background: `linear-gradient(135deg, ${project.color}44, ${project.color}22)`, borderColor: `${project.color}33` }}>
          {project.icon}
        </div>
        <h3 className={styles.featuredTitle}>{project.title}</h3>
        <p className={styles.featuredDesc}>{project.description}</p>
        <ul className={styles.featuredPoints}>
          {project.points.map((p, i) => <li key={i}><span className={styles.pointDot} style={{ background: project.color }} />{p}</li>)}
        </ul>
        <div className={styles.techStack}>
          {project.tech.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
        </div>
        <div className={styles.links}>
          <a href={project.github} target="_blank" rel="noreferrer" className={styles.linkBtn}>
            <GitHubIcon /> GitHub
          </a>
        </div>
      </div>
      <div className={styles.featuredRight}>
        <div className={styles.featuredVisual} style={{ background: `radial-gradient(ellipse at center, ${project.color}22 0%, transparent 70%)` }}>
          <div className={styles.codeMockup}>
            <div className={styles.mockupBar}>
              <span /><span /><span />
            </div>
            <div className={styles.mockupCode}>
              <span className={styles.cBlue}>const</span> <span className={styles.cGreen}>sqlify</span> = <span className={styles.cBlue}>async</span> (query) =&gt; {'{'}<br/>
              &nbsp;&nbsp;<span className={styles.cPurple}>const</span> result = <span className={styles.cBlue}>await</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;db.execute(query);<br/>
              &nbsp;&nbsp;<span className={styles.cBlue}>return</span> ai.hint(result);<br/>
              {'}'};
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const featured = projects.find(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="section-wrapper" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Things I've built</p>
        <h2 className="section-title">Featured <span>Projects</span></h2>
      </motion.div>

      {featured && <FeaturedProject project={featured} />}

      <div className={styles.grid}>
        {rest.map((project, i) => (
          <motion.div
            key={project.title}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            whileHover={{ y: -6, borderColor: `${project.color}55` }}
          >
            <div className={styles.cardTop}>
              <div className={styles.cardIcon} style={{ background: `linear-gradient(135deg, ${project.color}44, ${project.color}22)`, borderColor: `${project.color}33` }}>
                {project.icon}
              </div>
              <a href={project.github} target="_blank" rel="noreferrer" className={styles.ghLink}><GitHubIcon /></a>
            </div>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.description}</p>
            <div className={styles.techStack} style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              {project.tech.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
