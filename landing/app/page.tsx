'use client'

import { Sparkles, Eye, Users, Zap, Lock, Heart, Download, Instagram, Twitter } from 'lucide-react'
import styles from './styles.module.css'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Animated background gradients */}
        <div className={styles.heroBg}>
          <div className={`${styles.blob} ${styles.blob1}`}></div>
          <div className={`${styles.blob} ${styles.blob2}`}></div>
          <div className={`${styles.blob} ${styles.blob3}`}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Sparkles size={16} color="#8B5CF6" />
            <span>Join 2M+ Gen Z users</span>
          </div>

          <h1 className={styles.heroTitle}>
            Blur.<br />
            <span className="gradient-text">Reveal.</span><br />
            Connect.
          </h1>

          <p className={styles.heroSubtitle}>
            The viral anonymous photo app that's taking over your school. Share blurred photos, run polls, and reveal yourself to your crush. 👀
          </p>

          <div className={styles.buttonGroup}>
            <button className={styles.btnPrimary}>
              <Download size={20} />
              Download for iOS
            </button>
            <button className={styles.btnSecondary}>
              Coming to Android
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>2M+</div>
              <div className={styles.statLabel}>Active Users</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>50M+</div>
              <div className={styles.statLabel}>Blurs Sent</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>#1</div>
              <div className={styles.statLabel}>Social App</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollBox}>
            <div className={styles.scrollDot}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Why Everyone's Using <span className="gradient-text">Blur</span>
            </h2>
            <p className={styles.sectionDesc}>
              The most fun way to connect with your friends, make new ones, and stay anonymous until you're ready.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <FeatureCard
              icon={<Eye size={32} />}
              title="Blur & Reveal"
              description="Share blurred photos. Let your friends guess who you are. Reveal yourself when you want."
              gradient="linear-gradient(135deg, var(--purple) 0%, #7C3AED 100%)"
            />
            <FeatureCard
              icon={<Users size={32} />}
              title="Viral Polls"
              description="Run anonymous polls. 'Who's most likely to...' 'Who should date who?' Watch them blow up."
              gradient="linear-gradient(135deg, var(--pink) 0%, #DB2777 100%)"
            />
            <FeatureCard
              icon={<Lock size={32} />}
              title="100% Anonymous"
              description="No one knows it's you until you reveal. Say what you really think. Be yourself."
              gradient="linear-gradient(135deg, #7C3AED 0%, var(--pink) 100%)"
            />
            <FeatureCard
              icon={<Heart size={32} />}
              title="Crush Mode"
              description="Like someone? Send them a blurred hint. They'll never know unless you want them to. 💕"
              gradient="linear-gradient(135deg, #DB2777 0%, var(--purple) 100%)"
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="Viral Loops"
              description="Tag friends, start chains, blow up group chats. Every reveal creates more buzz."
              gradient="linear-gradient(135deg, var(--purple) 0%, var(--pink) 100%)"
            />
            <FeatureCard
              icon={<Sparkles size={32} />}
              title="Made for Gen Z"
              description="No old people. No cringe. Just you and your friends being real."
              gradient="linear-gradient(135deg, var(--pink) 0%, #7C3AED 100%)"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.section} style={{ background: 'linear-gradient(to bottom, var(--black) 0%, rgba(139, 92, 246, 0.05) 50%, var(--black) 100%)' }}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              So Simple, It's <span className="gradient-text">Addictive</span>
            </h2>
            <p className={styles.sectionDesc}>Get started in 3 steps. Literally.</p>
          </div>

          <div className={styles.stepsGrid}>
            <StepCard
              number="1"
              title="Take a Photo"
              description="Snap a pic or choose from your camera roll. Blur it automatically."
            />
            <StepCard
              number="2"
              title="Share & Wait"
              description="Send to friends or post to your school. Watch the guesses roll in."
            />
            <StepCard
              number="3"
              title="Reveal (or Don't)"
              description="Unblur when you're ready. Or keep them guessing forever. Your choice."
            />
          </div>

          <div className={styles.ctaBox}>
            <p className={styles.ctaTitle}>Ready to go viral?</p>
            <p className={styles.ctaDesc}>Join your friends on Blur today</p>
            <button className={styles.btnPrimary}>
              <Download size={20} />
              Download Now
            </button>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className={styles.section} style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', top: 0, left: '25%', width: '384px', height: '384px', background: 'var(--purple)', borderRadius: '50%', opacity: 0.1, filter: 'blur(80px)' }}></div>
          <div style={{ position: 'absolute', bottom: 0, right: '25%', width: '384px', height: '384px', background: 'var(--pink)', borderRadius: '50%', opacity: 0.1, filter: 'blur(80px)' }}></div>
        </div>

        <div className={styles.container} style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(36px, 10vw, 72px)', fontWeight: 900, marginBottom: '32px' }}>
            Don't Get <span className="gradient-text">Left Out</span>
          </h2>
          <p style={{ fontSize: '24px', color: 'var(--gray-400)', marginBottom: '48px' }}>
            Everyone at your school is already on Blur. What are you waiting for?
          </p>

          <div className={styles.buttonGroup} style={{ marginBottom: '48px' }}>
            <button className={`${styles.btnPrimary} glow-purple`} style={{ padding: '20px 40px', fontSize: '20px' }}>
              <Download size={24} />
              Download for iPhone
            </button>
            <button className={styles.btnSecondary} style={{ padding: '20px 40px', fontSize: '20px' }}>
              Get on Waitlist (Android)
            </button>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
            Free to download. No ads. No BS. Ages 13+
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerLogo}>Blur</h3>
            <p className={styles.footerTagline}>The viral social app for Gen Z</p>
          </div>

          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialLink}>
              <Instagram size={24} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Twitter size={24} />
            </a>
          </div>

          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Support</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          © 2024 Blur. All rights reserved. Made with 💜 for Gen Z.
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description, gradient }: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon} style={{ background: gradient }}>
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>
        {number}
      </div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{description}</p>
    </div>
  )
}
