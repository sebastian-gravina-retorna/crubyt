import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Linkedin, Mail, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { contact, nav } from '../content/site'
import { Container, cx } from './ui'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    setOpen(false)
    setMenu(null)
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={cx('hidden border-b border-white/10 bg-ink-900 text-white/70 transition-all md:block', scrolled && 'md:hidden')}>
        <Container className="flex h-9 items-center justify-between text-xs">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white">
            <Mail className="h-3.5 w-3.5" /> {contact.email}
          </a>
          <span className="hidden lg:block">{contact.tagline}</span>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white">
            <Linkedin className="h-4 w-4" />
          </a>
        </Container>
      </div>

      <div className={cx('border-b transition-all', scrolled ? 'border-ink/5 bg-white/90 shadow-sm backdrop-blur-lg' : 'border-transparent bg-white')}>
        <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link to="/" aria-label="Crubyt inicio" className="shrink-0">
            <img src="/assets/brand/logo-red.webp" alt="Crubyt" className="h-8 w-auto lg:h-9" width={210} height={80} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMenu(null)}>
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="relative" onMouseEnter={() => setMenu(item.label)}>
                  <button
                    className={cx('flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition hover:text-ink', menu === item.label && 'text-ink')}
                    onClick={() => setMenu(menu === item.label ? null : item.label)}
                    aria-expanded={menu === item.label}
                  >
                    {item.label}
                    <ChevronDown className={cx('h-4 w-4 transition', menu === item.label && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {menu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-3"
                      >
                        <div className="w-80 rounded-2xl border border-ink/5 bg-white p-2 shadow-2xl shadow-ink/10">
                          {item.children.map((c) => (
                            <Link key={c.to} to={c.to} className="block rounded-xl px-4 py-3 transition hover:bg-mist">
                              <span className="block text-sm font-semibold text-ink">{c.label}</span>
                              {c.desc && <span className="mt-0.5 block text-xs text-ink/55">{c.desc}</span>}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to!}
                  onMouseEnter={() => setMenu(null)}
                  className={({ isActive }) => cx('rounded-full px-4 py-2 text-sm font-medium transition hover:text-ink', isActive ? 'text-brand' : 'text-ink/80')}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contacto" className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-600 sm:inline-flex">
              Contáctanos
            </Link>
            <button className="rounded-full p-2 text-ink lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-ink/5 bg-white lg:hidden"
          >
            <Container className="max-h-[calc(100vh-4rem)] overflow-y-auto py-4">
              {nav.map((item) => (
                <div key={item.label} className="border-b border-ink/5 py-3 last:border-0">
                  {item.children ? (
                    <>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/40">{item.label}</p>
                      {item.children.map((c) => (
                        <Link key={c.to} to={c.to} className="block py-2 text-base font-medium text-ink">
                          {c.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link to={item.to!} className="block py-1 text-base font-semibold text-ink">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link to="/contacto" className="mt-4 flex justify-center rounded-full bg-brand px-5 py-3 font-semibold text-white">
                Contáctanos
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
