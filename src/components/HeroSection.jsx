import { useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import TrailerModal from './TrailerModal'

/* ===========================
   HeroSection — featured 콘텐츠 배너
=========================== */
const HeroSection = ({ content }) => {
  const [modalOpen, setModalOpen] = useState(false)

  if (!content) {
    return (
      <section
        id="hero"
        style={{
          height: '100vh',
          background: 'var(--color-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: 'var(--color-subtext)' }}>로딩 중...</p>
      </section>
    )
  }

  return (
    <>
      <section
        id="hero"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '600px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '10vh',
        }}
        aria-label="대표 콘텐츠 히어로 배너"
      >
        {/* 배경 이미지 */}
        <img
          src={content.poster_url}
          alt={content.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            filter: 'brightness(0.55)',
          }}
        />

        {/* gradient overlay — 하단 페이드 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, transparent 30%, rgba(15,15,15,0.6) 65%, #0F0F0F 100%)',
          }}
          aria-hidden="true"
        />

        {/* 좌측 세로 gradient overlay — glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0.4) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* 콘텐츠 텍스트 영역 */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '0 5%',
            maxWidth: '620px',
          }}
        >
          {/* 장르 배지 */}
          <span
            style={{
              display: 'inline-block',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '4px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {content.genre}
          </span>

          {/* 타이틀 */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '16px',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              wordBreak: 'keep-all',
            }}
          >
            {content.title}
          </h1>

          {/* 메타 정보 */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '3px',
                padding: '2px 8px',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {content.rating}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              {content.runtime}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              {content.release_date?.slice(0, 4)}
            </span>
          </div>

          {/* 설명 */}
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '500px',
              wordBreak: 'keep-all',
            }}
          >
            {content.description}
          </p>

          {/* CTA 버튼 */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fff',
                color: '#000',
                padding: '12px 28px',
                borderRadius: 'var(--radius)',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'background 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.85)'
                e.currentTarget.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              aria-label={`${content.title} 지금 시청하기`}
            >
              <PlayArrowIcon />
              지금 시청하기
            </button>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.18)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: 'var(--radius)',
                fontWeight: 700,
                fontSize: '1rem',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'background 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.28)'
                e.currentTarget.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              aria-label={`${content.title} 예고편 보기`}
            >
              <InfoOutlinedIcon />
              예고편 보기
            </button>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.6,
            animation: 'bounce 2s infinite',
          }}
          aria-hidden="true"
        >
          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateX(-50%) translateY(0) }
              50% { transform: translateX(-50%) translateY(8px) }
            }
          `}</style>
          <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: '#fff' }}>SCROLL</span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(180deg, #fff, transparent)',
            }}
          />
        </div>
      </section>

      {/* 예고편 모달 */}
      {modalOpen && (
        <TrailerModal content={content} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}

export default HeroSection
