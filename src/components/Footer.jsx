import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'

/* ===========================
   Footer
=========================== */
const footerLinks = {
  서비스: ['서비스 소개', '요금제', '공지사항', '채용 정보'],
  지원: ['고객센터', 'FAQ', '디바이스 지원', '접근성'],
  법적고지: ['이용약관', '개인정보처리방침', '쿠키 설정', '법적 고지'],
}

const socialLinks = [
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: YouTubeIcon, label: 'YouTube' },
]

const Footer = () => {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid var(--color-border)',
        padding: '56px 5% 32px',
      }}
      role="contentinfo"
    >
      {/* 상단 — 로고 + SNS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="OTT-TEST"
            style={{ height: '32px', width: 'auto', objectFit: 'contain', marginBottom: '8px' }}
          />
          <p
            style={{
              color: 'var(--color-subtext)',
              fontSize: '0.85rem',
              maxWidth: '280px',
              lineHeight: 1.6,
            }}
          >
            언제 어디서나 원하는 콘텐츠를 즐기세요.
            <br />
            프리미엄 스트리밍 서비스 OTT-TEST
          </p>
        </div>

        {/* SNS 링크 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {socialLinks.map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--color-surface)',
                color: 'var(--color-subtext)',
                border: '1px solid var(--color-border)',
                transition: 'color 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-subtext)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              aria-label={label}
            >
              <Icon fontSize="small" />
            </a>
          ))}
        </div>
      </div>

      {/* 링크 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
        }}
      >
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4
              style={{
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {category}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      color: 'var(--color-subtext)',
                      fontSize: '0.85rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-subtext)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* 고객센터 */}
        <div>
          <h4
            style={{
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            고객센터
          </h4>
          <p style={{ color: 'var(--color-subtext)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            운영 시간<br />
            평일 09:00 ~ 18:00<br />
            주말/공휴일 휴무
          </p>
          <button
            style={{
              marginTop: '12px',
              background: 'var(--color-surface)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: 'var(--radius)',
              fontSize: '0.82rem',
              border: '1px solid var(--color-border)',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            aria-label="고객센터 문의하기"
          >
            문의하기
          </button>
        </div>
      </div>

      {/* 하단 */}
      <div
        style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p style={{ color: 'var(--color-subtext)', fontSize: '0.8rem' }}>
          © 2026 OTT-TEST. All rights reserved.
        </p>
        <p style={{ color: 'var(--color-subtext)', fontSize: '0.8rem' }}>
          Made with ❤️ by 황혜경
        </p>
      </div>
    </footer>
  )
}

export default Footer
