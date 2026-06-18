import { useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import TrailerModal from './TrailerModal'

/* ===========================
   ContentSection — 16:9 와이드 카드 그리드
=========================== */
const ContentCard = ({ content, onPlay }) => {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked] = useState(false)
  const [wished, setWished] = useState(false)

  return (
    <article
      style={{
        position: 'relative',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: '16 / 10',
        /* 네온 글로우 hover */
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.38s ease, box-shadow 0.38s ease',
        boxShadow: hovered
          ? '0 0 0 1.5px rgba(229,9,20,0.55), 0 8px 36px rgba(229,9,20,0.3), 0 20px 60px rgba(0,0,0,0.65)'
          : '0 4px 16px rgba(0,0,0,0.45)',
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 포스터 이미지 — hover 시 zoom-in, 기본 밝기 유지 */}
      <img
        src={content.poster_url}
        alt={content.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          filter: hovered ? 'brightness(0.5)' : 'brightness(1)',
          transition: 'transform 0.5s ease, filter 0.4s ease',
        }}
        loading="lazy"
      />

      {/* 하단 30% 그라데이션 — 항상 표시, 타이틀 가독성 확보 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 30%, transparent 55%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* 텍스트 / 버튼 레이어 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '14px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}
      >
        {/* 항상 표시 — 타이틀 16px+ */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: hovered ? '10px' : '0',
            transition: 'margin 0.3s ease',
            textAlign: 'left',
            width: '100%',
            textShadow: '0 1px 6px rgba(0,0,0,0.8)',
          }}
        >
          {content.title}
        </h3>

        {/* hover 시만 표시 */}
        <div
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '3px',
              }}
            >
              {content.genre}
            </span>
            <span
              style={{
                border: '1px solid rgba(255,255,255,0.45)',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: '3px',
              }}
            >
              {content.rating}
            </span>
          </div>

          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.8rem',
              lineHeight: 1.55,
              marginBottom: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {content.description}
          </p>

          {/* 액션 버튼 */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => onPlay(content)}
              style={{
                background: '#fff',
                color: '#000',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              aria-label={`${content.title} 재생`}
            >
              <PlayArrowIcon style={{ fontSize: '1.2rem' }} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setWished(!wished) }}
              style={{
                background: wished ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.15)',
                color: wished ? 'var(--color-primary)' : '#fff',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${wished ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)'}`,
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}
              aria-label={wished ? '찜 취소' : '찜하기'}
              aria-pressed={wished}
            >
              {wished ? <CheckIcon style={{ fontSize: '1.1rem' }} /> : <AddIcon style={{ fontSize: '1.1rem' }} />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
              style={{
                background: liked ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.15)',
                color: liked ? 'var(--color-primary)' : '#fff',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${liked ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)'}`,
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}
              aria-label={liked ? '좋아요 취소' : '좋아요'}
              aria-pressed={liked}
            >
              {liked ? <ThumbUpAltIcon style={{ fontSize: '1rem' }} /> : <ThumbUpAltOutlinedIcon style={{ fontSize: '1rem' }} />}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

const ContentSection = ({ contents }) => {
  const [modalContent, setModalContent] = useState(null)

  return (
    <>
      <section id="contents" className="section fade-up" aria-label="주요 콘텐츠">
        <h2 className="section-title">지금 뜨는 콘텐츠</h2>

        <div
          style={{
            display: 'grid',
            /* auto-fit: 빈 열 없이 카드가 컨테이너를 꽉 채움 */
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            marginTop: '24px',
          }}
          role="list"
        >
          {contents.map((content) => (
            <div key={content.id} role="listitem">
              <ContentCard content={content} onPlay={setModalContent} />
            </div>
          ))}
        </div>
      </section>

      {modalContent && (
        <TrailerModal content={modalContent} onClose={() => setModalContent(null)} />
      )}
    </>
  )
}

export default ContentSection
