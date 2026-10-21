import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import IndustryPage from './pages/IndustryPage'
import ComoTrabajamos from './pages/ComoTrabajamos'
import Nosotros from './pages/Nosotros'
import Blog from './pages/Blog'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'
import { Contacto, Eventos, Privacidad } from './pages/misc'
import { services } from './content/services'
import { industries } from './content/industries'

// El backend se descarga solo al entrar a /admin
const AdminApp = lazy(() => import('./admin/AdminApp'))

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) return el.scrollIntoView({ behavior: 'smooth' })
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  if (pathname === '/admin' || pathname.startsWith('/admin/'))
    return (
      <Suspense fallback={<div className="min-h-screen bg-mist" />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    )
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {services.map((s) => (
            <Route key={s.slug} path={`/${s.slug}`} element={<ServicePage s={s} />} />
          ))}
          {industries.map((i) => (
            <Route key={i.slug} path={`/${i.slug}`} element={<IndustryPage ind={i} />} />
          ))}
          <Route path="/como-trabajamos" element={<ComoTrabajamos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog mode="blog" />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="/casos-de-exito" element={<Blog mode="casos" />} />
          <Route path="/category/casos-de-exito" element={<Navigate to="/casos-de-exito" replace />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/hablemos" element={<Navigate to="/contacto" replace />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
