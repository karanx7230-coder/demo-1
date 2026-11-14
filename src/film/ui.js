import { gsap } from 'gsap';
import {
  business,
  wa,
  tel,
  services,
  fleet,
  destinations,
  trust,
  testimonials,
} from './data.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const esc = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export function hydrateContent() {
  const waDefault = wa('Hi Karnail Tour and Travels, I want to book a ride from ___ to ___.');

  document.querySelectorAll('[data-wa]').forEach((el) => {
    const message = el.dataset.wa;
    el.href = message ? wa(message) : waDefault;
    if (!el.getAttribute('target')) el.target = '_blank';
    el.setAttribute('rel', 'noreferrer');
  });
  document.querySelectorAll('[data-tel]').forEach((el) => {
    el.href = tel;
  });
  document.querySelectorAll('[data-phone-display]').forEach((el) => {
    el.textContent = business.phoneDisplay;
  });
  document.querySelectorAll('[data-hours]').forEach((el) => {
    el.textContent = business.hours;
  });
  document.querySelectorAll('[data-address]').forEach((el) => {
    el.textContent = business.base;
  });

  const servicesList = document.querySelector('[data-services-list]');
  if (servicesList) {
    servicesList.innerHTML = services
      .map(
        (service, index) => `
        <article class="service-slide${index === 0 ? ' is-active' : ''}" data-service-slide aria-hidden="${index !== 0}">
          <p class="service-slide__index">${service.index} <span>/ 06</span></p>
          <h3 class="service-slide__word">${esc(service.short)}</h3>
          <div class="service-slide__body">
            <p class="service-slide__title">${esc(service.title)}</p>
            <p class="service-slide__copy">${esc(service.copy)}</p>
            <a class="text-link" href="${wa(`Hi Karnail Tour and Travels, I would like to enquire about ${service.title.toLowerCase()}.`)}" target="_blank" rel="noreferrer">
              Book this ride <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>`,
      )
      .join('');
  }

  const servicesIndex = document.querySelector('[data-services-index]');
  if (servicesIndex) {
    servicesIndex.innerHTML = services
      .map(
        (service, index) => `
        <li>
          <button class="service-jump${index === 0 ? ' is-current' : ''}" type="button" data-jump-service="${index}">
            <span>${service.index}</span> ${esc(service.title)}
          </button>
        </li>`,
      )
      .join('');
  }

  const fleetList = document.querySelector('[data-fleet-list]');
  if (fleetList) {
    fleetList.innerHTML = fleet
      .map(
        (vehicle, index) => `
        <li class="fleet-row${index === 0 ? ' is-active' : ''}">
          <span class="fleet-row__num">0${index + 1}</span>
          <span class="fleet-row__name">${esc(vehicle.name)}</span>
          <span class="fleet-row__specs">${esc(vehicle.seats)} <i>·</i> ${esc(vehicle.ac)} <i>·</i> ${esc(vehicle.luggage)}</span>
          <span class="fleet-row__copy">${esc(vehicle.copy)}</span>
          <a href="${wa(`Hi Karnail Tour and Travels, I would like to book a ${vehicle.name.toLowerCase()}.`)}" target="_blank" rel="noreferrer" class="fleet-row__cta">
            Enquire <span aria-hidden="true">↗</span>
          </a>
        </li>`,
      )
      .join('');
  }

  const destStack = document.querySelector('[data-dest-stack]');
  const destList = document.querySelector('[data-dest-list]');
  if (destStack) {
    destStack.innerHTML = destinations
      .map(
        (destination, index) => `
        <article class="dest-slide${index === 0 ? ' is-active' : ''}" data-dest="${index}">
          <p class="dest-slide__kicker">Destination ${String(index + 1).padStart(2, '0')} · ${esc(destination.meta)}</p>
          <h3 class="dest-slide__name">${esc(destination.name)}</h3>
          <p class="dest-slide__copy">${esc(destination.copy)}</p>
          <a class="text-link" href="${wa(`Hi Karnail Tour and Travels, I want to plan a trip to ${destination.name}.`)}" target="_blank" rel="noreferrer">
            Plan ${esc(destination.name)} <span aria-hidden="true">↗</span>
          </a>
        </article>`,
      )
      .join('');
  }
  if (destList) {
    destList.innerHTML = destinations
      .map(
        (destination, index) => `
        <button type="button" class="dest-jump${index === 0 ? ' is-current' : ''}" data-jump-dest="${index}">
          <span>${String(index + 1).padStart(2, '0')}</span> ${esc(destination.name)}
        </button>`,
      )
      .join('');
  }

  const trustList = document.querySelector('[data-trust-list]');
  if (trustList) {
    trustList.innerHTML = trust
      .map(
        (item) => `
        <li class="trust-row">
          <span class="trust-row__index">${item.index}</span>
          <span class="trust-row__word" aria-hidden="true">${esc(item.word)}</span>
          <span class="trust-row__copy"><strong>${esc(item.title)}</strong>${esc(item.copy)}</span>
        </li>`,
      )
      .join('');
  }

  const reviewsList = document.querySelector('[data-reviews-list]');
  if (reviewsList) {
    reviewsList.innerHTML = testimonials
      .map(
        (review, index) => `
        <li class="review-row${index === 0 ? ' is-active' : ''}">
          <span class="review-row__index">${String(index + 1).padStart(2, '0')}</span>
          <blockquote class="review-row__body">
            <p>“${esc(review.quote)}”</p>
            <footer>
              <span>${esc(review.name)}</span>
              <i>·</i>
              <span>${esc(review.trip)}</span>
              ${review.placeholder ? '<span class="sample-tag">Sample</span>' : ''}
            </footer>
          </blockquote>
        </li>`,
      )
      .join('');
  }

  const footerServices = document.querySelector('[data-footer-services]');
  if (footerServices) {
    footerServices.innerHTML = services
      .map(
        (service) =>
          `<li><a data-scene-link="services" href="#services">${esc(service.title)}</a></li>`,
      )
      .join('');
  }

  const serviceSelect = document.querySelector('[data-service-select]');
  if (serviceSelect) {
    serviceSelect.innerHTML = `<option value="">Choose</option>${services
      .map((service) => `<option value="${esc(service.title)}">${esc(service.title)}</option>`)
      .join('')}`;
  }

  document.querySelectorAll('[data-email]').forEach((el) => {
    if (business.email) {
      el.href = `mailto:${business.email}`;
      el.textContent = business.email;
      el.classList.remove('is-placeholder');
    } else {
      el.removeAttribute('href');
      el.textContent = business.emailPlaceholder;
      el.classList.add('is-placeholder');
    }
  });

  document.querySelectorAll('[data-brand-name]').forEach((el) => {
    el.textContent = business.name;
  });
  document.querySelectorAll('[data-brand-tagline]').forEach((el) => {
    el.textContent = business.tagline;
  });
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

export async function playLoader({ enginePromise, reduced = false }) {
  const loader = document.getElementById('loader');
  const counter = document.querySelector('[data-loader-percent]');
  const word = document.querySelector('[data-loader-word]');
  const state = { v: 0 };
  const words = ['CITY', 'HIGHWAY', 'MOUNTAINS'];
  const setWord = (value) => {
    if (!word) return;
    const index = value < 34 ? 0 : value < 72 ? 1 : 2;
    word.textContent = words[index];
  };
  const setValue = () => {
    const value = Math.round(state.v);
    if (counter) counter.textContent = `${String(value).padStart(3, '0')}%`;
    if (loader) loader.style.setProperty('--load', String(state.v / 100));
    setWord(value);
  };

  if (!loader) return;
  if (reduced) {
    loader.style.setProperty('--load', '1');
    loader.classList.add('is-done');
    loader.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-loading');
    setTimeout(() => loader.remove(), 400);
    return;
  }

  const startTween = gsap.to(state, {
    v: 90,
    duration: 1.15,
    ease: 'power2.out',
    onUpdate: setValue,
  });

  const results = await Promise.allSettled([
    enginePromise,
    new Promise((resolve) => setTimeout(resolve, 1150)),
  ]);
  startTween.kill();
  await gsap.to(state, {
    v: 100,
    duration: 0.24,
    ease: 'power2.inOut',
    onUpdate: setValue,
  });
  loader.classList.add('is-done');
  if (results[0].status === 'rejected') {
    document.documentElement.classList.add('is-fallback');
  }
  await new Promise((resolve) => setTimeout(resolve, 180));

  gsap.to(loader, {
    yPercent: -100,
    duration: 0.95,
    ease: 'expo.inOut',
    delay: 0.02,
    onComplete: () => {
      loader.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-loading');
      gsap.set(loader, { display: 'none' });
    },
  });

  const lines = document.querySelectorAll('.hero [data-lines] .line > span');
  if (lines.length) {
    gsap.fromTo(
      lines,
      { yPercent: 116 },
      { yPercent: 0, duration: 1.05, stagger: 0.1, ease: 'expo.out', delay: 0.5 },
    );
  }
  const heroFades = document.querySelectorAll('.hero [data-fade]');
  if (heroFades.length) {
    gsap.fromTo(
      heroFades,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.55 },
    );
  }
  gsap.fromTo(
    '.site-header',
    { y: -22, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', delay: 0.5 },
  );
  gsap.fromTo(
    '.progress',
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.8, ease: 'power2.out', delay: 0.75 },
  );
}

function sceneJumpTarget(id) {
  const filmEl = document.getElementById('film');
  if (!filmEl) return 0;
  const timings = window.__KTT_SCENES__ || {};
  const timing = timings[id];
  const start = timing ? timing[0] : 0;
  const max = filmEl.offsetHeight - window.innerHeight;
  return filmEl.offsetTop + Math.max(0, max) * start + 2;
}

export function initUi({ lenis, engine, reduced = false }) {
  const menu = document.getElementById('menu');
  const menuButton = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const root = document.documentElement;
  let menuOpen = false;

  const openMenu = () => {
    if (!menu || menuOpen) return;
    menuOpen = true;
    menu.classList.add('is-open');
    menu.removeAttribute('inert');
    menu.setAttribute('aria-hidden', 'false');
    menuButton?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    lenis?.stop();
    if (reduced) return;
    gsap.fromTo(
      menu.querySelectorAll('.menu-scene'),
      { yPercent: 115, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.05, ease: 'expo.out', delay: 0.18 },
    );
    gsap.fromTo(
      menu.querySelectorAll('.menu__aside > *'),
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.38 },
    );
  };

  const closeMenu = () => {
    if (!menu || !menuOpen) return;
    menuOpen = false;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    lenis?.start();
  };

  menuButton?.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
  menuClose?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const scrollToY = (Y) => {
    if (lenis) {
      lenis.scrollTo(Y, {
        duration: reduced ? 0 : 1.7,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      window.scrollTo({ top: Y, behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  const jumpToScene = (id) => {
    scrollToY(sceneJumpTarget(id));
  };

  document.querySelectorAll('[data-scene-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.dataset.sceneLink;
      closeMenu();
      setTimeout(() => jumpToScene(id), 170);
    });
  });

  document.querySelectorAll('[data-home]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      closeMenu();
      setTimeout(() => scrollToY(0), 120);
    });
  });

  document.querySelectorAll('[data-jump-dest]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.jumpDest);
      const timing = window.__KTT_SCENES__?.destinations || [0.5, 0.67];
      const local = (index + 0.35) / destinations.length;
      const progress = timing[0] + (timing[1] - timing[0]) * local;
      const filmEl = document.getElementById('film');
      if (!filmEl) return;
      const max = filmEl.offsetHeight - window.innerHeight;
      scrollToY(filmEl.offsetTop + max * progress);
    });
  });

  document.querySelectorAll('[data-jump-service]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.jumpService);
      const timing = window.__KTT_SCENES__?.services || [0.13, 0.33];
      const local = (index + 0.3) / services.length;
      const progress = timing[0] + (timing[1] - timing[0]) * local;
      const filmEl = document.getElementById('film');
      if (!filmEl) return;
      const max = filmEl.offsetHeight - window.innerHeight;
      scrollToY(filmEl.offsetTop + max * progress);
    });
  });

  const form = document.getElementById('booking-form');
  const formStatus = document.querySelector('[data-form-status]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const from = String(data.get('from') || '').trim();
    const to = String(data.get('to') || '').trim();
    const date = String(data.get('date') || '').trim();
    const service = String(data.get('service') || '').trim();
    const notes = String(data.get('message') || '').trim();
    const message = [
      'Hi Karnail Tour and Travels, I want to book a ride.',
      `Name: ${name}`,
      `Phone: ${phone}`,
      from ? `Pickup: ${from}` : '',
      to ? `Drop: ${to}` : '',
      date ? `Date: ${date}` : '',
      service ? `Service: ${service}` : '',
      notes ? `Notes: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    if (formStatus) {
      formStatus.textContent = 'Opening WhatsApp with your details…';
      formStatus.classList.add('is-visible');
    }
    window.open(wa(message), '_blank', 'noopener');
    gsap.fromTo(form, { x: -6 }, { x: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' });
  });

  // Magnetic buttons.
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
      el.addEventListener('pointermove', (event) => {
        const rect = el.getBoundingClientRect();
        xTo((event.clientX - (rect.left + rect.width / 2)) * 0.2);
        yTo((event.clientY - (rect.top + rect.height / 2)) * 0.26);
      });
      el.addEventListener('pointerleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  // Headlight cursor.
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  if (cursor && dot && window.matchMedia('(pointer: fine)').matches && !reduced) {
    root.classList.add('has-custom-cursor');
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3.out' });
    const dxTo = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dyTo = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    window.addEventListener(
      'pointermove',
      (event) => {
        xTo(event.clientX);
        yTo(event.clientY);
        dxTo(event.clientX);
        dyTo(event.clientY);
        cursor.classList.add('is-visible');
        dot.classList.add('is-visible');
        engine?.setPointer(
          (event.clientX / window.innerWidth) * 2 - 1,
          (event.clientY / window.innerHeight) * 2 - 1,
        );
      },
      { passive: true },
    );
    document.querySelectorAll('a, button, input, select, textarea, [data-cursor]').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
    });
    window.addEventListener('pointerdown', () => dot.classList.add('is-down'));
    window.addEventListener('pointerup', () => dot.classList.remove('is-down'));
    document.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-visible');
      dot.classList.remove('is-visible');
    });
  }

  // Touch drag / gyroscope parallax.
  if (!reduced && window.matchMedia('(pointer: coarse)').matches) {
    let startX = 0;
    let startY = 0;
    window.addEventListener(
      'pointerdown',
      (event) => {
        startX = event.clientX;
        startY = event.clientY;
      },
      { passive: true },
    );
    window.addEventListener(
      'pointermove',
      (event) => {
        if (event.pointerType !== 'touch') return;
        engine?.setPointer(
          ((event.clientX - startX) / window.innerWidth) * 1.2,
          ((event.clientY - startY) / window.innerHeight) * 1.2,
        );
      },
      { passive: true },
    );
    if (typeof DeviceOrientationEvent !== 'undefined') {
      window.addEventListener(
        'deviceorientation',
        (event) => {
          if (event.gamma == null || event.beta == null) return;
          engine?.setPointer(
            Math.max(-1, Math.min(1, event.gamma / 35)),
            Math.max(-1, Math.min(1, (event.beta - 45) / 45)),
          );
        },
        { passive: true },
      );
    }
  }

  return { closeMenu };
}
