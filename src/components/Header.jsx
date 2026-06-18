import { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

/* ===========================
   Header — sticky + blur + nav active
=========================== */
const navItems = [
  { label: '홈', href: '#hero' },
  { label: '콘텐츠', href: '#contents' },
  { label: '상세 소개', href: '#detail' },
  { label: '추천', href: '#recommend' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        background: scrolled
          ? 'rgba(15, 15, 15, 0.92)'
          : 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* 로고 */}
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}
        aria-label="OTT-TEST 홈으로"
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="OTT-TEST 로고"
          style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
        />
      </a>

      {/* 네비게이션 */}
      <nav
        style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
        role="navigation"
        aria-label="주 메뉴"
      >
        {navItems.map(({ label, href }) => {
          const sectionId = href.replace('#', '')
          const isActive = activeSection === sectionId
          return (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="nav-link"
              style={{
                color: isActive ? '#fff' : 'var(--color-subtext)',
                fontWeight: isActive ? 700 : 400,
                fontSize: '0.9rem',
                transition: 'color 0.2s ease',
                position: 'relative',
                paddingBottom: '4px',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--color-primary)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </a>
          )
        })}
      </nav>

      {/* 우측 아이콘 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: 'transparent',
              color: '#fff',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s ease',
            }}
            aria-label="검색"
            aria-expanded={searchOpen}
          >
            <SearchIcon fontSize="small" />
          </button>
          {searchOpen && (
            <input
              type="search"
              placeholder="제목, 장르 검색..."
              autoFocus
              style={{
                position: 'absolute',
                right: 0,
                top: '40px',
                width: '240px',
                padding: '10px 14px',
                background: 'rgba(24,24,24,0.98)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius)',
                color: '#fff',
                fontSize: '0.875rem',
                outline: 'none',
              }}
              aria-label="콘텐츠 검색"
              onBlur={() => setSearchOpen(false)}
            />
          )}
        </div>
        <button
          style={{
            background: 'transparent',
            color: '#fff',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            transition: 'background 0.2s ease',
          }}
          aria-label="마이페이지"
        >
          <AccountCircleIcon fontSize="small" />
        </button>
      </div>
    </header>
  )
}

export default Header
