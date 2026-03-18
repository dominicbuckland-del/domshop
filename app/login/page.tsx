'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [supabaseAvailable, setSupabaseAvailable] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const supabase = createBrowserClient()
    setSupabaseAvailable(!!supabase)

    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) router.push('/')
      })
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createBrowserClient()
    if (!supabase) {
      setError('Authentication is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
      setLoading(false)
      return
    }

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })
        if (signUpError) throw signUpError
        setShowOnboarding(true)
        setError(null)
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError
        router.push('/')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    const supabase = createBrowserClient()
    if (!supabase) {
      setError('Authentication is not configured.')
      return
    }

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    })
    if (oauthError) {
      setError(oauthError.message)
    }
  }

  // Onboarding screen after sign up
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <nav className="glass border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 md:px-16 h-11 md:h-12 flex items-center">
            <Link href="/" className="text-[15px] md:text-[17px] font-medium tracking-tight text-primary">
              iDentity
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center px-5 md:px-8 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-primary">
                Check your email
              </h1>
              <p className="text-[15px] md:text-[17px] text-muted mt-3 max-w-sm mx-auto leading-relaxed">
                We sent a verification link to <span className="text-primary">{email}</span>. Click it to activate your store.
              </p>
            </div>

            <div className="bg-surface rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 mb-8">
              <h2 className="text-[17px] md:text-[19px] font-semibold text-primary mb-5">What happens next</h2>

              <div className="space-y-5">
                {[
                  {
                    step: '1',
                    title: 'Your name becomes the headline',
                    desc: 'Once signed in, the homepage hero displays your name instead of "iDentity". This is your store now.',
                  },
                  {
                    step: '2',
                    title: 'Browse and curate',
                    desc: 'Scroll through the categories. Every product was algorithm-surfaced. Remove anything that does not match your taste -- this trains the algorithm.',
                  },
                  {
                    step: '3',
                    title: 'Teach the algorithm',
                    desc: 'Click any product and use "Teach your algorithm" to correct wrong recommendations. The more corrections, the better it gets.',
                  },
                  {
                    step: '4',
                    title: 'Make it yours',
                    desc: 'Fork the repo, replace the products with your own life, connect your data sources, and deploy. The guide walks through every step.',
                  },
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <span className="text-[14px] font-semibold text-accent w-5 flex-shrink-0 pt-0.5">{item.step}</span>
                    <div>
                      <p className="text-[15px] font-medium text-primary">{item.title}</p>
                      <p className="text-[13px] md:text-[14px] text-muted mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="w-full text-center h-[48px] flex items-center justify-center rounded-full bg-accent text-white text-[15px] font-medium hover:bg-accent/90 active:scale-[0.97] transition-all"
              >
                Go to your store
              </Link>
              <Link
                href="/guide"
                className="w-full text-center h-[48px] flex items-center justify-center rounded-full text-accent text-[15px] font-medium hover:text-accent/80 transition-colors"
              >
                Read the setup guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Nav */}
      <nav className="glass border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 md:px-16 h-11 md:h-12 flex items-center">
          <Link href="/" className="text-[15px] md:text-[17px] font-medium tracking-tight text-primary">
            iDentity
          </Link>
        </div>
      </nav>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-5 md:px-8 py-16 md:py-20">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-[28px] md:text-[32px] font-semibold tracking-tight text-primary">
              {isSignUp ? 'Create your store' : 'Sign in'}
            </h1>
            <p className="text-[14px] md:text-[15px] text-muted mt-2">
              {isSignUp
                ? 'Build your own algorithm-driven store'
                : 'Access your personal iDentity store'
              }
            </p>
          </div>

          {!supabaseAvailable && (
            <div className="mb-6 p-4 bg-surface rounded-2xl border border-white/10">
              <p className="text-[13px] text-muted leading-relaxed">
                Authentication is not configured yet. Set <code className="text-primary font-mono text-[12px]">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="text-primary font-mono text-[12px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your <code className="text-primary font-mono text-[12px]">.env.local</code> file.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full h-12 px-4 rounded-xl bg-surface border border-white/10 text-[15px] text-primary placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={6}
                className="w-full h-12 px-4 rounded-xl bg-surface border border-white/10 text-[15px] text-primary placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>

            {error && (
              <p className={`text-[13px] px-1 ${error.includes('Check your email') ? 'text-green-400' : 'text-red-400'}`}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-accent text-white text-[15px] md:text-[16px] font-medium hover:bg-accent/90 active:scale-[0.97] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="relative my-5 md:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-4 text-[13px] text-muted">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full h-12 rounded-full bg-surface border border-white/10 text-[15px] font-medium text-primary hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center mt-5 md:mt-6 text-[13px] md:text-[14px] text-muted">
            {isSignUp ? 'Already have a store?' : "Don't have a store yet?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(null) }}
              className="text-accent hover:text-accent/80 transition-colors"
            >
              {isSignUp ? 'Sign in' : 'Create one'}
            </button>
          </p>

          <div className="text-center mt-6 md:mt-8">
            <Link href="/" className="text-[13px] text-muted hover:text-primary transition-colors">
              Back to store
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
