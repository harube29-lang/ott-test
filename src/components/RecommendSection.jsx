import { useRef, useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import TrailerModal from './TrailerModal'

/* ===========================
   RecommendSection — 가로 스크롤 추천 콘텐츠
=========================== */
const RecommendSection = ({ recommendations }) => {
  const scrollRef = useRef(null)
  const [modalContent, setModalContent] = useState(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' })
    }
  }

  if (!recommendations?.length) return null

  return (
    <>
      <section
        id="recommend"
        className="section fade-up"
        aria-label="추천 콘텐츠"
      >
        <h2 className="section-title">추천 콘텐츠</h2>

        <div style={{ position: 'relative', marginTop: '24px' }}>
          {/* 좌측 화살표 */}
          <button
            onClick={() => scroll(-1)}
            style={{
              position: 'absolute',
              left: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(24,24,24,0.9)',
              color: '#fff',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: 'var(--shadow)',
              transition: 'background 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(40,40,40,0.98)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(24,24,24,0.9)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
            aria-label="이전 콘텐츠"
          >
            <ChevronLeftIcon />
          </button>

          {/* 가로 스크롤 컨테이너 — Partial Peek: 다음 카드 ~25% 노출 */}
          <style>{`
            .recommend-scroll::-webkit-scrollbar { display: none; }
            /* Partial Peek 반응형 카드 너비 */
            .peek-card {
              flex-shrink: 0;
              /* 데스크톱: 3개 + 25% 노출 */
              width: calc((100% - 48px) / 3.25);
              min-width: 260px;
              max-width: 340px;
            }
            @media (max-width: 1199px) {
              /* 태블릿: 2개 + 25% */
              .peek-card { width: calc((100% - 32px) / 2.25); max-width: 400px; }
            }
            @media (max-width: 767px) {
              /* 모바일: 1개 + 25% */
              .peek-card { width: calc((100% - 16px) / 1.25); max-width: 100%; }
            }
          `}</style>
          <div
            ref={scrollRef}
            className="recommend-scroll"
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '12px',
              scrollbarWidth: 'none',
            }}
            role="list"
            aria-label="추천 콘텐츠 목록"
          >
            {recommendations.map(({ id, reason, content }) => (
              <div
                key={id}
                role="listitem"
                className="peek-card"
                style={{
                  scrollSnapAlign: 'start',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(229,9,20,0.4)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                onClick={() => content && setModalContent(content)}
              >
                {/* 포스터 */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={content?.poster_url}
                    alt={content?.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(229,9,20,0.85)',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    className="play-icon-overlay"
                  >
                    <PlayArrowIcon style={{ color: '#fff' }} />
                  </div>
                </div>

                {/* 카드 내용 */}
                <div style={{ padding: '18px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                    {content?.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span
                      style={{
                        background: 'rgba(229,9,20,0.15)',
                        color: 'var(--color-primary)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '3px',
                      }}
                    >
                      {content?.genre}
                    </span>
                    <span style={{ color: 'var(--color-subtext)', fontSize: '0.8rem' }}>
                      {content?.runtime}
                    </span>
                  </div>
                  <p
                    style={{
                      color: 'var(--color-subtext)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.7,
                      letterSpacing: '0.02em',
                      fontStyle: 'italic',
                      borderLeft: '2px solid var(--color-primary)',
                      paddingLeft: '12px',
                    }}
                  >
                    {reason}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 우측 화살표 */}
          <button
            onClick={() => scroll(1)}
            style={{
              position: 'absolute',
              right: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(24,24,24,0.9)',
              color: '#fff',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: 'var(--shadow)',
              transition: 'background 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(40,40,40,0.98)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(24,24,24,0.9)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
            aria-label="다음 콘텐츠"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </section>

      {modalContent && (
        <TrailerModal content={modalContent} onClose={() => setModalContent(null)} />
      )}
    </>
  )
}

export default RecommendSection
