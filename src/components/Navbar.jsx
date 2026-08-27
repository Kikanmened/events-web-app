import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Events', end: true },
  { to: '/events/create', label: 'Create Event' },
  { to: '/signin', label: 'Sign In' },
  { to: '/signup', label: 'Sign Up' },
]

function navClassName({ isActive }) {
  return [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-slate-900 text-white'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ')
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-slate-900"
          onClick={closeMenu}
        >
          Events App
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={navClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6.4 17.65 5.35 16.6 10.95 12 5.35 7.4 6.4 6.35 12 11.95 16.6 6.35 17.65 7.4 12.05 12 17.65 16.6 16.6 17.65 12 12.05z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              <path
                fill="currentColor"
                d="M4 18v-2h16v2zm0-5v-2h16v2zm0-5V6h16v2z"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-nav"
          className="space-y-1 border-t border-slate-200 px-4 py-3 md:hidden"
          aria-label="Main"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `${navClassName({ isActive })} block`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navbar
