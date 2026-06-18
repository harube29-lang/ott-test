import { useState, useEffect } from 'react'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

/* ===========================
   Footer — OTT 브랜드 완성 영역
=========================== */

const socialLinks = [
  { Icon: InstagramIcon, label: 'Instagram', color: '#E1306C' },
  { Icon: YouTubeIcon, label: 'YouTube', color: '#FF0000' },
  { Icon: TwitterIcon, label: 'X (Twitter)', color: '#1DA1F2' },
]

const policyLinks = [
  { label: '이용약관' },
  { label: '개인정보처리방침' },
  { label: '저작권 안내' },
  { label: '쿠키 설정' },
]

const serviceLinks = [
  { label: '서비스 소개' },
  { label: '요금제 안내' },
  { label: '디바이스 지원' },
  { label: '공지사항' },
  { label: '채용 정보' },
]

const faqList = [
  {
    q: '어떤 기기에서 시청 가능한가요?',
    a: 'PC, 스마트폰, 태블릿, 스마트TV 등 다양한 기기에서 시청 가능합니다. iOS / Android 앱과 웹 브라우저를 모두 지원합니다.',
  },
  {
    q: '무료로 이용할 수 있나요?',
    a: '7일 무료 체험 후 유료 구독으로 전환됩니다. 기본 / 스탠다드 / 프리미엄 3가지 요금제를 제공하며 언제든지 해지 가능합니다.',
  },
  {
    q: '콘텐츠는 얼마나 자주 업데이트되나요?',
    a: '매주 새로운 콘텐츠가 추가됩니다. 오리지널 시리즈, 영화, 예능, 다큐멘터리 등 다양한 장르가 정기 업데이트됩니다.',
  },
  {
    q: '동시 접속은 몇 명까지 가능한가요?',
    a: '요금제에 따라 1~4개 기기 동시 접속이 가능합니다. 프리미엄 요금제는 최대 4개 화면 동시 시청을 지원합니다.',
  },
]

/* FAQ 아코디언 아이템 */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'transparent',
          color: open ? '#fff' : 'rgba(255,255,255,0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 0',
          fontSize: '0.9rem',
          fontWeight: open ? 600 : 400,
          textAlign: 'left',
          transition: 'color 0.2s ease',
          gap: '12px',
        }}
        aria-expanded={open}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = open ? '#fff' : 'rgba(255,255,255,0.8)')}
      >
        <span>{q}</span>
        <ExpandMoreIcon
          style={{
            flexShrink: 0,
            color: open ? 'var(--color-primary)' : 'var(--color-subtext)',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease, color 0.2s ease',
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? '200px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p
          style={{
            color: 'var(--color-subtext)',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            paddingBottom: '18px',
            paddingLeft: '4px',
          }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

/* Top 버튼 */
const TopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '28px',
        zIndex: 999,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--color-primary)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(229,9,20,0.5)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease, filter 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
      onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
      aria-label="페이지 상단으로 이동"
    >
      <KeyboardArrowUpIcon />
    </button>
  )
}

/* ===========================
   Footer 본체
=========================== */
const Footer = () => {
  const [emailHovered, setEmailHovered] = useState(false)

  return (
    <>
      <footer
        style={{
          background: '#0a0a0a',
          borderTop: '1px solid var(--color-border)',
        }}
        role="contentinfo"
      >
        {/* ── 메인 그리드 영역 ── */}
        <div
          style={{
            padding: '64px 5% 48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
          }}
        >
          {/* 블록 1: 로고 + 슬로건 + 회사 소개 */}
          <div style={{ gridColumn: 'span 1' }}>
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="OTT-TEST"
              style={{ height: '32px', width: 'auto', objectFit: 'contain', marginBottom: '14px', display: 'block' }}
            />
            <p
              style={{
                color: 'var(--color-primary)',
                fontSize: '0.78rem',
                fontStyle: 'italic',
                letterSpacing: '0.5px',
                marginBottom: '16px',
              }}
            >
              "Unlimited stories, endless entertainment"
            </p>
            <p style={{ color: 'var(--color-subtext)', fontSize: '0.84rem', lineHeight: 1.7, marginBottom: '20px' }}>
              글로벌 콘텐츠 스트리밍 서비스 OTT-TEST.<br />
              다양한 장르의 콘텐츠를 언제 어디서나 제공합니다.
            </p>

            {/* SNS 링크 */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map(({ Icon, label, color }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--color-surface)',
                    color: 'var(--color-subtext)',
                    border: '1px solid var(--color-border)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = color
                    e.currentTarget.style.borderColor = color
                    e.currentTarget.style.background = `${color}18`
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-subtext)'
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.background = 'var(--color-surface)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  aria-label={label}
                >
                  <Icon style={{ fontSize: '1.1rem' }} />
                </a>
              ))}
            </div>
          </div>

          {/* 블록 2: 서비스 링크 */}
          <div>
            <h4 style={headingStyle}>서비스</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {serviceLinks.map(({ label }) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-subtext)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 블록 3: 정책 & 정보 */}
          <div>
            <h4 style={headingStyle}>정책 & 정보</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {policyLinks.map(({ label }) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-subtext)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 블록 4: 고객센터 (강조) */}
          <div>
            <h4 style={headingStyle}>고객센터</h4>

            {/* 강조 카드 */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(229,9,20,0.12) 0%, rgba(229,9,20,0.04) 100%)',
                border: '1px solid rgba(229,9,20,0.25)',
                borderRadius: 'var(--radius)',
                padding: '18px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <HeadsetMicOutlinedIcon style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }} />
                <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600 }}>
                  24/7 고객 지원
                </span>
              </div>
              <p style={{ color: 'var(--color-subtext)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '12px' }}>
                평일 09:00 ~ 18:00<br />
                주말 / 공휴일 자동 응답 운영
              </p>
              <a
                href="mailto:support@ott-test.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  color: emailHovered ? '#fff' : 'var(--color-primary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                <EmailOutlinedIcon style={{ fontSize: '0.95rem' }} />
                support@ott-test.com
              </a>
            </div>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                display: 'block',
                textAlign: 'center',
                background: 'var(--color-primary)',
                color: '#fff',
                padding: '10px 0',
                borderRadius: 'var(--radius)',
                fontSize: '0.85rem',
                fontWeight: 700,
                transition: 'filter 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
              aria-label="도움말 센터 바로가기"
            >
              도움말 센터 바로가기
            </a>
          </div>
        </div>

        {/* ── FAQ 영역 ── */}
        <div
          style={{
            padding: '0 5% 48px',
            maxWidth: '780px',
          }}
        >
          <h4
            style={{
              ...headingStyle,
              fontSize: '1rem',
              marginBottom: '8px',
            }}
          >
            자주 묻는 질문
          </h4>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {faqList.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>

        {/* ── 하단 저작권 ── */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '20px 5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <p style={{ color: 'var(--color-subtext)', fontSize: '0.78rem' }}>
            © 2026 OTT-TEST. All rights reserved.
          </p>
          <p style={{ color: 'var(--color-subtext)', fontSize: '0.78rem' }}>
            Made with ❤️ by 황혜경
          </p>
        </div>
      </footer>

      {/* Top 버튼 — 페이지 우측 하단 고정 */}
      <TopButton />
    </>
  )
}

/* 공통 스타일 상수 */
const headingStyle = {
  color: '#fff',
  fontSize: '0.82rem',
  fontWeight: 700,
  marginBottom: '18px',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
}

const linkStyle = {
  color: 'var(--color-subtext)',
  fontSize: '0.84rem',
  transition: 'color 0.2s ease',
  textDecoration: 'none',
}

export default Footer
