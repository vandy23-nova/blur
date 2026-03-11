'use client'

import { Sparkles, Eye, Users, Zap, Lock, Heart, Download, Instagram, Twitter } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-primary rounded-full opacity-20 blur-3xl animate-float"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-pink-primary rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-purple-primary rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-primary/20 border border-purple-primary/30 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-primary" />
            <span className="text-sm font-medium">Join 2M+ Gen Z users</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight animate-fade-in">
            Blur.<br />
            <span className="gradient-text">Reveal.</span><br />
            Connect.
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The viral anonymous photo app that's taking over your school. Share blurred photos, run polls, and reveal yourself to your crush. 👀
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-primary to-pink-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download for iOS
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-200">
              Coming to Android
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold gradient-text">2M+</div>
              <div className="text-sm text-gray-500 mt-1">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">50M+</div>
              <div className="text-sm text-gray-500 mt-1">Blurs Sent</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">#1</div>
              <div className="text-sm text-gray-500 mt-1">Social App</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Why Everyone's Using <span className="gradient-text">Blur</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The most fun way to connect with your friends, make new ones, and stay anonymous until you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Eye className="w-8 h-8" />}
              title="Blur & Reveal"
              description="Share blurred photos. Let your friends guess who you are. Reveal yourself when you want."
              gradient="from-purple-primary to-purple-600"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Viral Polls"
              description="Run anonymous polls. 'Who's most likely to...' 'Who should date who?' Watch them blow up."
              gradient="from-pink-primary to-pink-600"
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="100% Anonymous"
              description="No one knows it's you until you reveal. Say what you really think. Be yourself."
              gradient="from-purple-600 to-pink-primary"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Crush Mode"
              description="Like someone? Send them a blurred hint. They'll never know unless you want them to. 💕"
              gradient="from-pink-600 to-purple-primary"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Viral Loops"
              description="Tag friends, start chains, blow up group chats. Every reveal creates more buzz."
              gradient="from-purple-primary to-pink-primary"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Made for Gen Z"
              description="No old people. No cringe. Just you and your friends being real."
              gradient="from-pink-primary to-purple-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-black via-purple-primary/5 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              So Simple, It's <span className="gradient-text">Addictive</span>
            </h2>
            <p className="text-xl text-gray-400">Get started in 3 steps. Literally.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
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

          <div className="mt-20 text-center">
            <div className="inline-block p-8 bg-gradient-to-br from-purple-primary/20 to-pink-primary/20 border border-purple-primary/30 rounded-3xl backdrop-blur-sm">
              <p className="text-2xl font-bold mb-4">Ready to go viral?</p>
              <p className="text-gray-400 mb-6">Join your friends on Blur today</p>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-primary to-pink-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 inline-flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-primary rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-primary rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            Don't Get <span className="gradient-text">Left Out</span>
          </h2>
          <p className="text-2xl text-gray-400 mb-12">
            Everyone at your school is already on Blur. What are you waiting for?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-10 py-5 bg-gradient-to-r from-purple-primary to-pink-primary rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 glow-purple">
              <Download className="w-6 h-6" />
              Download for iPhone
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-bold text-xl hover:bg-white/20 transition-all duration-200">
              Get on Waitlist (Android)
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Free to download. No ads. No BS. Ages 13+
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-3xl font-black gradient-text mb-2">Blur</h3>
              <p className="text-gray-500 text-sm">The viral social app for Gen Z</p>
            </div>

            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            © 2024 Blur. All rights reserved. Made with 💜 for Gen Z.
          </div>
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
    <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-purple-primary/50 transition-all duration-300 hover:scale-105">
      <div className={`inline-flex p-3 bg-gradient-to-br ${gradient} rounded-2xl mb-4 group-hover:shadow-lg transition-shadow`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-primary to-pink-primary rounded-full text-3xl font-black mb-6 glow-purple">
        {number}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
    </div>
  )
}
