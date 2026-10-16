import {gallery} from '../data/content.js'
import {site} from '../data/siteConfig.js'

export function initPage(){
 const header=document.querySelector('.site-header')
 const topButton=document.querySelector('.floating-top')
 const onScroll=()=>{
  header?.classList.toggle('scrolled',scrollY>20)
  topButton?.classList.toggle('is-visible',scrollY>500)
 }
 window.onscroll=onScroll
 onScroll()
 topButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))

 const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('.mobile-menu')
 toggle?.addEventListener('click',()=>{
  const open=document.body.classList.toggle('menu-open')
  toggle.setAttribute('aria-expanded',open)
  toggle.setAttribute('aria-label',open?'Close menu':'Open menu')
  menu.setAttribute('aria-hidden',String(!open))
  toggle.innerHTML=`<i data-lucide="${open?'x':'menu'}"></i>`
  window.renderSalonIcons?.()
 })
 document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')))

 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08})
  document.querySelectorAll('.reveal').forEach(element=>observer.observe(element))
 }else{
  document.querySelectorAll('.reveal').forEach(element=>element.classList.add('visible'))
 }

 document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const group=btn.closest('.filter-bar');group.querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const v=btn.dataset.filter;document.querySelectorAll(btn.dataset.target).forEach(el=>el.hidden=v!=='All'&&el.dataset.category!==v)}))
 document.querySelectorAll('.faq-button').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.parentElement,was=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(x=>{x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});if(!was){item.classList.add('open');btn.setAttribute('aria-expanded','true')}}))

 const lb=document.querySelector('.lightbox')
 if(lb){let index=0;const img=lb.querySelector('img'),caption=lb.querySelector('.lightbox-caption');const show=i=>{index=(i+gallery.length)%gallery.length;img.src=gallery[index][2];img.alt=gallery[index][0];caption.textContent=gallery[index][0]};const close=()=>{lb.hidden=true;document.body.classList.remove('lightbox-open')};document.querySelectorAll('.gallery-item').forEach(el=>el.addEventListener('click',()=>{show(+el.dataset.index);lb.hidden=false;document.body.classList.add('lightbox-open');lb.querySelector('.lightbox-close').focus()}));lb.querySelector('.lightbox-close').onclick=close;lb.querySelector('.lightbox-prev').onclick=()=>show(index-1);lb.querySelector('.lightbox-next').onclick=()=>show(index+1);lb.onclick=e=>{if(e.target===lb)close()};document.onkeydown=e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1)}}

 const form=document.querySelector('#appointment-form')
 form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const msg=`Hello Geetarani Unisex Salon,\n\nI would like to request an appointment.\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nPreferred Date: ${d.get('date')}\nPreferred Time: ${d.get('time')}\nMessage: ${d.get('message')||'—'}\n\nThank you.`;window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank','noopener')})
}
