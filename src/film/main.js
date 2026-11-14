import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hydrateContent, playLoader, initUi } from './ui.js';
import { createSmoothScroll, setupExperience } from './scroll.js';
import { business } from './data.js';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = window.matchMedia('(max-width: 767px)').matches;
const canvas = document.getElementById('webgl');

document.body.classList.add('is-loading');
document.documentElement.dataset.scene = 'hero';
hydrateContent();

const { lenis } = createSmoothScroll({ reduced });
lenis.on('scroll', ({ scroll }) => {
  document.body.classList.toggle('has-scrolled', scroll > 40);
  document.documentElement.style.setProperty('--scroll', String(scroll));
});

function supportsWebGL() {
  try {
    const test = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (test.getContext('webgl2') || test.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

const canRender = !reduced && supportsWebGL();
if (!canRender) document.documentElement.classList.add('is-fallback');

let engine = null;
let started = false;
let experience = null;

const enginePromise = canRender
  ? import('./engine.js').then(async ({ FilmEngine }) => {
      const instance = new FilmEngine(canvas, {
        mobile,
        quality: mobile ? 'low' : 'high',
      });
      await instance.init();
      engine = instance;
      canvas.classList.add('is-ready');
      return instance;
    })
  : Promise.reject(new Error('Static fallback'));

enginePromise.catch((error) => {
  if (error?.message !== 'Static fallback') {
    console.warn('WebGL scene unavailable, using 2.5D fallback.', error);
  }
  document.documentElement.classList.add('is-fallback');
  canvas.classList.remove('is-ready');
});

const start = () => {
  if (started) return;
  started = true;
  experience = setupExperience({ engine, reduced });
  initUi({ lenis, engine, reduced });
  document.documentElement.dataset.ready = 'true';
  ScrollTrigger.refresh();
};

enginePromise.then(start).catch(start);

// Drive the whole film from one ticker.
gsap.ticker.add((time, deltaTime) => {
  engine?.tick(time, deltaTime);
});

playLoader({ enginePromise, reduced }).catch(() => {
  document.body.classList.remove('is-loading');
  document.documentElement.classList.add('is-fallback');
});

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
    experience?.sync(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
  }, 180);
});

// Keep contact details in one place; some microcopy is hydrated here.
document.querySelectorAll('[data-brand-name]').forEach((el) => {
  el.textContent = business.name;
});
document.querySelectorAll('[data-brand-tagline]').forEach((el) => {
  el.textContent = business.tagline;
});

// Make reduced-motion visitors land on a stable, readable page.
if (reduced) {
  window.addEventListener('load', () => {
    document.body.classList.remove('is-loading');
    document.getElementById('loader')?.remove();
  });
}
