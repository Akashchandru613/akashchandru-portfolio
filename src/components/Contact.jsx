import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import styles from './Contact.module.css'

// Web3Forms access key — tied to akashchandru613@gmail.com
// Get yours free at https://web3forms.com (enter your email, they send the key instantly)
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'

const socialLinks = [
  { label: 'Email', href: 'mailto:akashchandruus@gmail.com', icon: '✉', desc: 'akashchandruus@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akash-chandru-185692217/', icon: 'in', desc: 'linkedin.com/in/akash-chandru', target: '_blank' },
  { label: 'GitHub', href: 'https://github.com/akashchandru613', icon: '⌥', desc: 'github.com/akashchandru', target: '_blank' },
  { label: 'Phone', href: 'tel:408-396-4773', icon: '☏', desc: '408-396-4773' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio message from ${form.name}`,
          redirect: false,
        }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Message sent! I\'ll get back to you soon.', {
          style: { background: '#0c0f1a', color: '#f0f2ff', border: '1px solid #1e2440' },
          iconTheme: { primary: '#4ade80', secondary: '#0c0f1a' },
          duration: 5000,
        })
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again or email me directly.', {
        style: { background: '#0c0f1a', color: '#f0f2ff', border: '1px solid #1e2440' },
        iconTheme: { primary: '#f87171', secondary: '#0c0f1a' },
        duration: 6000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-wrapper" ref={ref}>
      <Toaster position="bottom-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Let's connect</p>
        <h2 className="section-title">Get In <span>Touch</span></h2>
      </motion.div>

      <div className={styles.grid}>
        {/* Left: form */}
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className={styles.formTitle}>Send me a message</h3>
          <p className={styles.formSub}>I typically respond within 24 hours.</p>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Message</label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="What's on your mind?"
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          <motion.button
            type="submit"
            className={`${styles.submitBtn} ${loading ? styles.loading : ''}`}
            whileHover={loading ? {} : { scale: 1.02 }}
            whileTap={loading ? {} : { scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : 'Send Message →'}
          </motion.button>
        </motion.form>

        {/* Right: social links */}
        <motion.div
          className={styles.socials}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.availBox}>
            <span className={styles.availDot} />
            <div>
              <p className={styles.availTitle}>Available for work</p>
              <p className={styles.availSub}>Open to SDE internships & full-time roles starting Dec 2026</p>
            </div>
          </div>

          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target ? 'noreferrer' : undefined}
              className={styles.socialLink}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              whileHover={{ x: 5 }}
            >
              <div className={styles.socialIcon}>{link.icon}</div>
              <div>
                <p className={styles.socialLabel}>{link.label}</p>
                <p className={styles.socialDesc}>{link.desc}</p>
              </div>
              <svg className={styles.arrow} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
