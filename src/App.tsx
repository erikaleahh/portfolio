import { Route, Routes } from 'react-router-dom'
import { RouteNavigation } from './components/RouteNavigation'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <>
      <a href="#main-content" className="sr-only fixed top-4 left-4 z-50 rounded bg-accent px-4 py-3 text-background focus:not-sr-only">Skip to content</a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <RouteNavigation />
    </>
  )
}

export default App
