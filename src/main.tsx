import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Above the 1920px design width, scale the whole page proportionally so every
// larger screen (2560, 3840, ...) looks exactly like the 1920px layout.
const DESIGN_WIDTH = 1920
const applyPageZoom = () => {
  const z = Math.max(1, window.innerWidth / DESIGN_WIDTH)
  document.documentElement.style.zoom = z === 1 ? '' : String(z)
  document.documentElement.style.setProperty('--page-zoom', String(z))
}
applyPageZoom()
window.addEventListener('resize', applyPageZoom)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
