import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import styles from './Hero.module.css'

const floatingTags = ['Python', 'React', 'AWS', 'Node.js', 'TypeScript', 'Docker', 'PostgreSQL', 'Kubernetes']

function ParticleField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(129,140,248,${p.alpha})`
        ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={canvasRef} className={styles.canvas} />
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.12 } } }

export default function Hero() {
  return (
    <section className={styles.hero}>
      <ParticleField />
      <div className={styles.heroBg} />

      <motion.div className={styles.content} variants={stagger} initial="hidden" animate="show">

        {/* Avatar */}
        <motion.div className={styles.avatarWrap} variants={fadeUp}>
          <div className={styles.avatar}>
            <img src="/MyPic.jpeg" alt="Akash Chandru" />
          </div>
          <div className={styles.avatarRing1} />
          <div className={styles.avatarRing2} />
        </motion.div>

        {/* Badge */}
        <motion.div className={styles.badge} variants={fadeUp}>
          <span className={styles.dot} />
          Open to opportunities · Expected Dec 2026
        </motion.div>

        {/* Heading */}
        <motion.h1 className={styles.heading} variants={fadeUp}>
          Hi, I'm <span className={styles.name}>Akash Chandru</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div className={styles.typingWrap} variants={fadeUp}>
          <span className={styles.typingPrefix}>I build </span>
          <TypeAnimation
            sequence={[
              'scalable full-stack apps', 2000,
              'cloud-native systems', 2000,
              'AI-powered platforms', 2000,
              'microservices architectures', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className={styles.typingText}
          />
          <span className={styles.cursor_}>|</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p className={styles.subtitle} variants={fadeUp}>
          MS Computer Science @ Northeastern · 2+ years building production systems serving 10,000+ users
        </motion.p>

        {/* CTA buttons */}
        <motion.div className={styles.buttons} variants={fadeUp}>
          <a href="#projects" className={styles.btnPrimary}>View My Work</a>
          <a href="#contact" className={styles.btnOutline}>Get In Touch</a>
          <a 
  href="https://drive.google.com/uc?export=download&id=1JbBX9m7tSXIbh-DQXsmslbbiUXScd_-z" 
  className={styles.btnGhost} 
  download
  target="_blank"
  rel="noopener noreferrer"
>
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
  Resume
</a>
        </motion.div>

        {/* Floating tech tags */}
        <motion.div className={styles.tags} variants={fadeUp}>
          {floatingTags.map((tag, i) => (
            <motion.span
              key={tag}
              className={styles.tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.08 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
