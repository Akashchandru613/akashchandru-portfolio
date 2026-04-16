import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const swordRef = useRef(null)
  const glowRef = useRef(null)
  const trailRefs = useRef([])
  const pos = useRef({ x: 0, y: 0 })
  const glow = useRef({ x: 0, y: 0 })
  const trail = useRef([])
  const raf = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Initialize trail positions
    for (let i = 0; i < 5; i++) {
      trail.current[i] = { x: 0, y: 0 }
    }

    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY } }

    const animate = () => {
      // Sword follows cursor immediately
      if (swordRef.current) {
        swordRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) rotate(-45deg)`
      }

      // Glow follows with slight lag
      glow.current.x += (pos.current.x - glow.current.x) * 0.15
      glow.current.y += (pos.current.y - glow.current.y) * 0.15
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${glow.current.x}px, ${glow.current.y}px)`
      }

      // Trail particles follow with cascading lag
      let prev = pos.current
      for (let i = 0; i < trail.current.length; i++) {
        const t = trail.current[i]
        const speed = 0.08 - i * 0.012
        t.x += (prev.x - t.x) * speed
        t.y += (prev.y - t.y) * speed
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform =
            `translate(${t.x}px, ${t.y}px)`
        }
        prev = t
      }

      raf.current = requestAnimationFrame(animate)
    }

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Trail particles */}
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          ref={el => (trailRefs.current[i] = el)}
          className={styles.trail}
          style={{ opacity: 0.4 - i * 0.07, width: 4 - i * 0.5, height: 4 - i * 0.5 }}
        />
      ))}

      {/* Glow aura */}
      <div
        ref={glowRef}
        className={`${styles.glow} ${hovering ? styles.glowHover : ''}`}
      />

      {/* Sword SVG */}
      <div
        ref={swordRef}
        className={`${styles.sword} ${hovering ? styles.swordHover : ''}`}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blade */}
          <path
            d="M4 2L6 4L16 14L14 16L4 6L2 4L4 2Z"
            fill="url(#bladeGrad)"
            stroke="#6ee7b7"
            strokeWidth="0.5"
          />
          {/* Blade shine */}
          <path d="M5 3L15 13" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
          {/* Guard (crossguard) */}
          <rect x="13" y="13" width="8" height="2" rx="1" transform="rotate(45 17 14)" fill="#f59e0b" />
          {/* Grip */}
          <path d="M18 18L22 22" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
          {/* Pommel */}
          <circle cx="23" cy="23" r="1.5" fill="#f59e0b" />
          <defs>
            <linearGradient id="bladeGrad" x1="2" y1="2" x2="16" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f0fdf4" />
              <stop offset="0.5" stopColor="#6ee7b7" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}
