import { useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MovieIcon from '@mui/icons-material/Movie'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import TrailerModal from './TrailerModal'

/* ===========================
   DetailSection — 콘텐츠 상세 소개 + 강조 배너
=========================== */
const DetailSection = ({ contents }) => {
  const [modalContent, setModalContent] = useState(null)

  const featured = contents?.find((c) => c.featured) || contents?.[0]

  if (!featured) return null

  const metaItems = [
    { icon: <MovieIcon style={{ fontSize: '1rem' }} />, label: featured.genre },
    { icon: <AccessTimeIcon style={{ fontSize: '1rem' }} />, label: featured.runtime },
    { icon: <StarIcon style={{ fontSize: '1rem', color: '#f5c518' }} />, label: featured.rating },
    { icon: <CalendarMonthIcon style={{ fontSize: '1rem' }} />, label: featured.release_date?.slice(0, 4) },
  ]

  return (
    <section
      id="detail"
      className="section"
      aria-label="상세 소개"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* 강조 배너 */}
      <div
        className="fade-up"
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '56px',
          /* 배너 높이 — 이미지 구도가 깨지지 않도록 여유롭게 */
          minHeight: 'clamp(360px, 48vh, 500px)',
          background: '#0a0305',
          border: '1px solid rgba(229,9,20,0.2)',
        }}
      >
        {/* Editor's Pick 이미지 — 선명하게, 구도 보존 */}
        <img
          src={`${import.meta.env.BASE_URL}seoul-night.png`}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '68%',
            objectFit: 'cover',
            /* 상단 25% 기준 — 인물·주요 액션 구도 보존 */
            objectPosition: 'center 25%',
          }}
        />
        {/* 좌→우 정교한 페이드 — 텍스트 박스와 이미지가 자연스럽게 녹아드는 5단계 블렌딩 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #0a0305 0%, rgba(10,3,5,0.97) 22%, rgba(10,3,5,0.78) 42%, rgba(10,3,5,0.3) 62%, rgba(10,3,5,0.05) 80%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(36px, 5vw, 60px)',
            maxWidth: '600px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '3px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            EDITOR'S PICK
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 900,
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            {featured.title}
          </h2>
          {/* 메타정보 UI */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {metaItems.map(({ icon, label }) => label && (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>
                {icon}
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              marginBottom: '32px',
              wordBreak: 'keep-all',
            }}
          >
            {featured.description}
          </p>
          <button
            onClick={() => setModalContent(featured)}
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: 'var(--radius)',
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'filter 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.15)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
            aria-label={`${featured.title} 지금 시청하기`}
          >
            지금 시청하기
          </button>
        </div>
      </div>

      {/* 섹션 타이틀 */}
      <h2 className="section-title fade-up">콘텐츠 상세 정보</h2>

      {/* 콘텐츠 카드 목록 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginTop: '32px',
        }}
      >
        {contents?.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="fade-up"
            style={{
              background: 'var(--color-glass)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              display: 'flex',
              gap: '16px',
              padding: '16px',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(229,9,20,0.4)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <img
              src={item.poster_url}
              alt={item.title}
              style={{
                width: '88px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: 'var(--radius)',
                flexShrink: 0,
              }}
              loading="lazy"
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>
                {item.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {[
                  { label: item.genre, color: 'var(--color-primary)' },
                  { label: item.runtime, color: 'var(--color-subtext)' },
                  { label: item.rating, color: 'var(--color-subtext)' },
                ].map(({ label, color }) => (
                  <span key={label} style={{ fontSize: '0.875rem', color }}>
                    {label}
                  </span>
                ))}
              </div>
              <p
                style={{
                  color: 'var(--color-subtext)',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {modalContent && (
        <TrailerModal content={modalContent} onClose={() => setModalContent(null)} />
      )}
    </section>
  )
}

export default DetailSection
