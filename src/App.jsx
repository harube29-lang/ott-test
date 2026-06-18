import { useState, useEffect } from 'react'
import { supabase } from './js/supabase'
import { initScrollAnimation } from './js/main'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import DetailSection from './components/DetailSection'
import RecommendSection from './components/RecommendSection'
import Footer from './components/Footer'

/* ===========================
   App — 데이터 페칭 + 레이아웃
=========================== */
const App = () => {
  const [contents, setContents] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentsRes, recsRes] = await Promise.all([
          supabase.from('contents').select('*').order('id'),
          supabase
            .from('recommendations')
            .select('*, content:contents(*)')
            .order('id'),
        ])
        if (contentsRes.data) setContents(contentsRes.data)
        if (recsRes.data) setRecommendations(recsRes.data)
      } catch (err) {
        console.error('데이터 로딩 실패:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => initScrollAnimation(), 100)
      return () => clearTimeout(timer)
    }
  }, [loading])

  const featuredContent = contents.find((c) => c.featured) || contents[0]

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <p style={{ color: 'var(--color-subtext)', fontSize: '0.9rem' }}>콘텐츠를 불러오는 중...</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection content={featuredContent} />
        <ContentSection contents={contents} />
        <DetailSection contents={contents} />
        <RecommendSection recommendations={recommendations} />
      </main>
      <Footer />
    </>
  )
}

export default App
