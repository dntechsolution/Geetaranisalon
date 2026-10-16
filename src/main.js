import './style.css'
import {
  createIcons, ArrowUpRight, ArrowRight, ArrowUp, Phone, Menu, Instagram, Facebook,
  MapPin, MessageCircle, CalendarDays, Sparkles, BadgeCheck, Users, Gem,
  Heart, Scissors, Palette, Flower2, PartyPopper, Expand, Wind, Droplets,
  WandSparkles, GitBranch, Grid2X2, MoveHorizontal, Sparkle, ShieldCheck,
  Eye, Brush, PaintbrushVertical, SwatchBook, Shapes, UserRound, Crown, Hand, Footprints, Feather, Shield, CircleDot, X,
  ChevronLeft, ChevronRight, Star, Plus, Navigation
} from 'lucide'
import { router, navigate } from './router.js'
import { renderHeader, renderFooter, renderMobileBar } from './components/layout.js'
import { initPage } from './components/interactions.js'

const icons = {
  ArrowUpRight, ArrowRight, ArrowUp, Phone, Menu, Instagram, Facebook, MapPin,
  MessageCircle, CalendarDays, Sparkles, BadgeCheck, Users, Gem, Heart,
  Scissors, Palette, Flower2, PartyPopper, Expand, Wind, Droplets,
  WandSparkles, GitBranch, Grid2X2, MoveHorizontal, Sparkle, ShieldCheck,
  Eye, Brush, PaintbrushVertical, SwatchBook, Shapes, UserRound, Crown, Hand, Footprints, Feather, Shield, CircleDot, X,
  ChevronLeft, ChevronRight, Star, Plus, Navigation
}

const app = document.querySelector('#app')
document.documentElement.classList.add('js')

function renderIcons() {
  createIcons({ icons, attrs: { 'stroke-width': 1.7 } })
}
window.renderSalonIcons = renderIcons

function render() {
  const route = router()
  document.body.classList.remove('menu-open', 'lightbox-open')
  app.innerHTML = `${renderHeader(route.path)}<main id="main-content">${route.html}</main>${renderFooter()}${renderMobileBar()}`
  document.title = route.title
  document.querySelector('meta[name="description"]').content = route.description
  initPage()
  renderIcons()
  window.scrollTo({ top: 0, behavior: 'instant' })
}

document.addEventListener('click', event => {
  const link = event.target.closest('a[data-link]')
  if (!link || link.origin !== location.origin) return
  event.preventDefault()
  navigate(link.pathname)
})
window.addEventListener('popstate', render)
window.addEventListener('salon:navigate', render)
render()
