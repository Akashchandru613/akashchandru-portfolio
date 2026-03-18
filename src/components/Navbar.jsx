import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)

    const sections = links.map(l => document.getElementById(l.toLowerCase())).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    )
    sections.forEach(s => obs.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  // close menu on scroll
  useEffect(() => {
    const onScroll = () => setMenuOpen(false)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.logo}>
          <span className={styles.logoText}>AC</span>
        </div>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map(link => (
            <li key={link} className={styles.linkItem}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`${styles.link} ${active === link.toLowerCase() ? styles.activeLink : ''}`}
              >
                {link}
                {active === link.toLowerCase() && (
                  <motion.span className={styles.activeDot} layoutId="activeDot" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <a href="mailto:akashchandruus@gmail.com" className={styles.hirebtn}>Hire Me</a>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`${styles.mobileLink} ${active === link.toLowerCase() ? styles.mobileLinkActive : ''}`}
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link}
              </motion.a>
            ))}
            <a
              href="mailto:akashchandruus@gmail.com"
              className={styles.mobileHireBtn}
              onClick={handleLinkClick}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
