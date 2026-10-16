import { Home, About, Services, Gallery, Testimonials, FAQ, Contact, NotFound } from './pages/index.js'
const routes = { '/': Home, '/about': About, '/services': Services, '/gallery': Gallery, '/testimonials': Testimonials, '/faq': FAQ, '/contact': Contact }
export function router() { const path = location.pathname.replace(/\/$/, '') || '/'; const page = (routes[path] || NotFound)(); return { path, ...page } }
export function navigate(path) { history.pushState({}, '', path); window.dispatchEvent(new Event('salon:navigate')) }
