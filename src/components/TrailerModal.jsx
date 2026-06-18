import { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

/* ===========================
   TrailerModal — ESC / 외부 클릭 닫기
=========================== */
const TrailerModal = ({ content, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${content?.title} 예고편`}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '800px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
          animation: 'slideUp 0.3s ease',
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
          }}
          aria-label="모달 닫기"
        >
          <CloseIcon fontSize="small" />
        </button>

        {/* 예고편 영역 (실제 영상 없으므로 glassmorphism 카드로 대체) */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            background: `linear-gradient(135deg, #1a0a0a 0%, #2a0808 50%, #0a0a1a 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {content?.poster_url && (
            <img
              src={content.poster_url}
              alt={content.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.4,
                filter: 'blur(2px)',
              }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(229, 9, 20, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(229,9,20,0.6)',
              }}
            >
              <PlayArrowIcon style={{ fontSize: '2.5rem', color: '#fff' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
              예고편 재생 중...
            </p>
          </div>
        </div>

        {/* 콘텐츠 정보 */}
        <div style={{ padding: '20px 24px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
            {content?.title}
          </h2>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
              {content?.genre}
            </span>
            <span style={{ color: 'var(--color-subtext)', fontSize: '0.8rem' }}>
              {content?.rating}
            </span>
            <span style={{ color: 'var(--color-subtext)', fontSize: '0.8rem' }}>
              {content?.runtime}
            </span>
          </div>
          <p style={{ color: 'var(--color-subtext)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            {content?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrailerModal
