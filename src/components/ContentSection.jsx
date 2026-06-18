import { useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import TrailerModal from './TrailerModal'

/* ===========================
   ContentSection — Netflix 스타일 카드 그리드
   hover 시 blur reveal + scale + shadow
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
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease, z-index 0s',
        boxShadow: hovered ? 'var(--shadow-hover)' : 'var(--shadow)',
        zIndex: hovered ? 10 : 1,
        aspectRatio: '2/3',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 포스터 이미지 */}
      <img
        src={content.poster_url}
        alt={content.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: hovered ? 'brightness(0.45) blur(1px)' : 'brightness(0.85)',
          transition: 'filter 0.35s ease',
        }}
        loading="lazy"
      />

      {/* hover reveal 오버레이 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: hovered
            ? 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.85) 100%)'
            : 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)',
          transition: 'background 0.35s ease',
        }}
      >
        {/* 항상 표시 — 타이틀 */}
        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            marginBottom: hovered ? '8px' : '0',
            transition: 'margin 0.3s ease',
            lineHeight: 1.3,
          }}
        >
          {content.title}
        </h3>

        {/* hover 시에만 표시 */}
        <div
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '3px',
              }}
            >
              {content.genre}
            </span>
            <span
              style={{
                border: '1px solid rgba(255,255,255,0.4)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '3px',
              }}
            >
              {content.rating}
            </span>
          </div>

          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '0.75rem',
              lineHeight: 1.5,
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
                width: '32px',
                height: '32px',
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
              <PlayArrowIcon style={{ fontSize: '1.1rem' }} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setWished(!wished) }}
              style={{
                background: wished ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.15)',
                color: wished ? 'var(--color-primary)' : '#fff',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
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
              {wished
                ? <CheckIcon style={{ fontSize: '1.1rem' }} />
                : <AddIcon style={{ fontSize: '1.1rem' }} />
              }
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
              style={{
                background: liked ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.15)',
                color: liked ? 'var(--color-primary)' : '#fff',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
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
              {liked
                ? <ThumbUpAltIcon style={{ fontSize: '1rem' }} />
                : <ThumbUpAltOutlinedIcon style={{ fontSize: '1rem' }} />
              }
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
      <section
        id="contents"
        className="section fade-up"
        aria-label="주요 콘텐츠"
      >
        <h2 className="section-title">지금 뜨는 콘텐츠</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
            marginTop: '16px',
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
