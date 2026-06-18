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
  const [hoveredNav, setHoveredNav] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
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
    <>
      {/* hover underline 애니메이션 CSS */}
      <style>{`
        .nav-item {
          position: relative;
          padding-bottom: 6px;
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: var(--color-primary);
          border-radius: 1px;
          transition: width 0.3s ease;
        }
        .nav-item:hover::after,
        .nav-item.active::after {
          width: 100%;
        }
        .nav-item:hover {
          color: #fff !important;
        }
        .icon-btn {
          background: transparent;
          color: rgba(255,255,255,0.75);
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease, background 0.2s ease, transform 0.15s ease;
        }
        .icon-btn:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
          transform: scale(1.1);
        }
      `}</style>

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
          /* 글래스모피즘 — 항상 blur 유지, 스크롤 시 더 불투명 */
          background: scrolled
            ? 'rgba(14, 14, 14, 0.88)'
            : 'rgba(20, 20, 20, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          transition: 'background 0.35s ease',
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
            style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* 네비게이션 — gap 여유 확대, 폰트 15px semi-bold */}
        <nav
          style={{ display: 'flex', gap: '44px', alignItems: 'center' }}
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
                className={`nav-item${isActive ? ' active' : ''}`}
                style={{
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                  fontSize: '15px',
                  letterSpacing: '0.3px',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* 우측 아이콘 — 22~24px */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="검색"
              aria-expanded={searchOpen}
            >
              <SearchIcon style={{ fontSize: '22px' }} />
            </button>
            {searchOpen && (
              <input
                type="search"
                placeholder="제목, 장르 검색..."
                autoFocus
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '48px',
                  width: '260px',
                  padding: '11px 16px',
                  background: 'rgba(20,20,20,0.98)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 'var(--radius)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                }}
                aria-label="콘텐츠 검색"
                onBlur={() => setSearchOpen(false)}
              />
            )}
          </div>
          <button
            className="icon-btn"
            aria-label="마이페이지"
          >
            <AccountCircleIcon style={{ fontSize: '24px' }} />
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
