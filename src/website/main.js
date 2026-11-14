import './style.css';

/* --------------------------------------------------------------------------
   Karnail Tour and Travels — small, dependency-free site script.
   Everything is progressively enhanced: the page works without it.
-------------------------------------------------------------------------- */

const header = document.querySelector('.header');
const nav = document.getElementById('primary-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.nav a')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const WHATSAPP = '918728878910';

/* --------------------------------------------------------------------------
   Header: shadow + hide on scroll down, reveal on scroll up
-------------------------------------------------------------------------- */

let lastY = 0;

const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 8);

  if (header) {
    if (y > 140 && y > lastY + 4) header.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 140) header.classList.remove('is-hidden');
  }
  lastY = y;
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* --------------------------------------------------------------------------
   Mobile navigation
-------------------------------------------------------------------------- */

let backdrop = null;

function openNav() {
  if (!nav || !navToggle) return;
  nav.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
  document.body.classList.add('nav-open');

  backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.addEventListener('click', closeNav);
  document.body.appendChild(backdrop);
  requestAnimationFrame(() => backdrop?.classList.add('is-open'));
}

function closeNav() {
  if (!nav || !navToggle) return;
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('nav-open');

  if (backdrop) {
    const node = backdrop;
    backdrop = null;
    node.classList.remove('is-open');
    node.addEventListener('transitionend', () => node.remove(), { once: true });
    setTimeout(() => node.remove(), 400);
  }
}

navToggle?.addEventListener('click', () => {
  if (nav?.classList.contains('is-open')) closeNav();
  else openNav();
});

navLinks.forEach((link) => link.addEventListener('click', closeNav));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    closeNav();
    navToggle?.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeNav();
});

/* --------------------------------------------------------------------------
   Scroll spy (deterministic: the last section above the fold line wins)
-------------------------------------------------------------------------- */

const spySections = navLinks
  .map((link) => {
    const id = link.getAttribute('href');
    if (!id || !id.startsWith('#')) return null;
    const section = document.querySelector(id);
    return section ? { link, section } : null;
  })
  .filter(Boolean);

let spyRaf = 0;

const updateSpy = () => {
  spyRaf = 0;
  if (!spySections.length) return;
  const line = window.scrollY + window.innerHeight * 0.42;
  let active = spySections[0];
  for (const item of spySections) {
    if (item.section.offsetTop <= line) active = item;
  }
  // Before the first section reaches the line, nothing is highlighted.
  if (spySections[0].section.offsetTop > line) active = null;

  navLinks.forEach((link) => {
    const on = active ? link === active.link : false;
    link.classList.toggle('is-current', on);
    if (on) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
};

const requestSpy = () => {
  if (!spyRaf) spyRaf = requestAnimationFrame(updateSpy);
};

if (spySections.length) {
  updateSpy();
  window.addEventListener('scroll', requestSpy, { passive: true });
  window.addEventListener('resize', requestSpy);
}

/* --------------------------------------------------------------------------
   Reveal on scroll
-------------------------------------------------------------------------- */

const revealItems = [...document.querySelectorAll('[data-reveal]')];

if (revealItems.length && !reducedMotion.matches && 'IntersectionObserver' in window) {
  revealItems.forEach((item) => {
    item.style.willChange = 'opacity, transform';
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        entry.target.style.willChange = 'auto';
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-in'));
}

/* --------------------------------------------------------------------------
   Booking form â†’ WhatsApp (nothing is stored)
-------------------------------------------------------------------------- */

const forms = [...document.querySelectorAll('#booking-form, #enquiry-form')];

forms.forEach((form) => {
  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = (key) => String(data.get(key) || '').trim();

    const name = value('name');
    const phone = value('phone');
    const from = value('from');
    const to = value('to');
    const date = value('date');
    const passengers = value('passengers');
    const service = value('service');
    const notes = value('message');

    const message = [
      'Hi Karnail Tour and Travels, I want to book a ride.',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Pickup: ${from}`,
      `Drop: ${to}`,
      date ? `Date: ${date}` : '',
      passengers ? `Passengers: ${passengers}` : '',
      service ? `Service: ${service}` : '',
      notes ? `Notes: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

    if (status) {
      status.textContent = 'Opening WhatsApp with your details…';
      status.classList.add('is-visible');
    }

    window.open(url, '_blank', 'noopener');
  });
});

/* --------------------------------------------------------------------------
   Small niceties
-------------------------------------------------------------------------- */

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
