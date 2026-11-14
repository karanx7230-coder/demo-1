import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sceneTiming, navScenes } from './data.js';

gsap.registerPlugin(ScrollTrigger);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (value, min, max) => {
  const t = clamp((value - min) / Math.max(0.0001, max - min), 0, 1);
  return t * t * (3 - 2 * t);
};

export function createSmoothScroll({ reduced = false } = {}) {
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: !reduced,
    wheelMultiplier: 0.92,
    touchMultiplier: 1.05,
    syncTouch: false,
    autoRaf: false,
    anchors: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return {
    lenis,
    destroy() {
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}

function sceneForProgress(p, timing = sceneTiming) {
  let active = navScenes[0];
  navScenes.forEach((scene) => {
    const [start, end] = timing[scene.id] || [0, 0];
    if (p >= start && (p < end || end >= 1)) active = scene;
  });
  return active;
}

export function getSceneStart(id) {
  const timing = sceneTiming[id];
  return timing ? timing[0] : 0;
}

function buildSceneTimeline(scene, reduced) {
  const lines = scene.querySelectorAll('[data-lines] .line > span');
  const fades = scene.querySelectorAll('[data-fade]');
  if (!lines.length && !fades.length) return null;

  const tl = gsap.timeline({ paused: true });
  if (lines.length) {
    tl.fromTo(
      lines,
      { yPercent: 116 },
      {
        yPercent: 0,
        duration: reduced ? 0.01 : 0.34,
        stagger: reduced ? 0 : 0.075,
        ease: 'expo.out',
      },
      0,
    );
  }
  if (fades.length) {
    tl.fromTo(
      fades,
      { y: reduced ? 0 : 26, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: reduced ? 0.01 : 0.3,
        stagger: reduced ? 0 : 0.065,
        ease: 'power3.out',
      },
      0.08,
    );
  }
  return tl;
}

export function setupExperience({ engine, reduced = false }) {
  const root = document.documentElement;
  const sceneLabels = [...document.querySelectorAll('[data-scene-label]')];
  const sceneIndexes = [...document.querySelectorAll('[data-scene-index]')];
  const percent = document.querySelector('[data-odometer-percent]');
  const roadFill = document.querySelector('[data-road-fill]');
  const menuLinks = [...document.querySelectorAll('[data-scene-link]')];
  const heroCue = document.querySelector('.scroll-cue');

  const sceneEls = [...document.querySelectorAll('#film .scene')];
  const sceneData = sceneEls.map((el) => {
    const id = el.dataset.scene;
    const [start, end] = sceneTiming[id] || [0, 1];
    return {
      el,
      id,
      start,
      end,
      local: 0,
      opacity: -1,
      active: false,
      timeline: id === 'hero' || reduced ? null : buildSceneTimeline(el, reduced),
    };
  });

  // Section heights drive the actual scroll positions. Re-read them on every
  // refresh so the labels, HUD and 3D scene windows stay locked together at
  // every viewport / media-query combination.
  const timing = {};
  const applyTiming = () => {
    const film = document.getElementById('film');
    if (!film) return;
    const max = Math.max(1, film.offsetHeight - window.innerHeight);
    const filmTop = film.getBoundingClientRect().top + window.scrollY;

    sceneEls.forEach((el, index) => {
      const next = sceneEls[index + 1];
      const startTop = el.getBoundingClientRect().top + window.scrollY - filmTop;
      const endTop = next
        ? next.getBoundingClientRect().top + window.scrollY - filmTop
        : film.offsetHeight;
      timing[el.dataset.scene] = [
        clamp(startTop / max, 0, 1),
        clamp(endTop / max, 0, 1),
      ];
    });

    sceneData.forEach((entry) => {
      const [start, end] = timing[entry.id] || [0, 1];
      entry.start = start;
      entry.end = end;
    });

    // ui.js reads this to turn menu / destination / service buttons into
    // precise scroll targets once the real layout is known.
    window.__KTT_SCENES__ = timing;

    engine?.setTiming?.(timing);
  };

  const serviceSlides = [...document.querySelectorAll('.service-slide')];
  const fleetRows = [...document.querySelectorAll('.fleet-row')];
  const destSlides = [...document.querySelectorAll('.dest-slide')];
  const destButtons = [...document.querySelectorAll('[data-jump-dest]')];
  const trustRows = [...document.querySelectorAll('.trust-row')];
  const reviewRows = [...document.querySelectorAll('.review-row')];

  let last = { scene: '', percent: -1, service: -1, fleet: -1, dest: -1, review: -1 };

  const setActiveScene = (scene) => {
    if (scene.id === last.scene) return;
    last.scene = scene.id;
    root.dataset.scene = scene.id;
    sceneLabels.forEach((label) => {
      label.textContent = scene.label;
    });
    sceneIndexes.forEach((indexEl) => {
      indexEl.textContent = scene.ratio;
    });
    menuLinks.forEach((link) => {
      const on = link.dataset.sceneLink === scene.id;
      link.classList.toggle('is-current', on);
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    document.getElementById('fallback')?.setAttribute('data-scene', scene.id);
    engine?.setScene(scene.id);
  };

  const sync = (p) => {
    const scene = sceneForProgress(p, timing);
    setActiveScene(scene);

    sceneData.forEach((entry) => {
      const fadeIn = entry.start <= 0 ? 1 : smoothstep(p, entry.start - 0.012, entry.start + 0.002);
      const fadeOut = entry.end >= 1 ? 1 : 1 - smoothstep(p, entry.end - 0.008, entry.end + 0.004);
      const opacity = Math.min(fadeIn, fadeOut);
      entry.local = clamp((p - entry.start) / Math.max(0.0001, entry.end - entry.start), 0, 1);

      if (Math.abs(opacity - entry.opacity) > 0.004) {
        entry.opacity = opacity;
        entry.el.style.opacity = String(opacity);
        entry.el.style.visibility = opacity > 0.012 ? 'visible' : 'hidden';
      }
      const active = opacity > 0.06;
      if (active !== entry.active) {
        entry.active = active;
        entry.el.classList.toggle('is-active', active);
        entry.el.style.pointerEvents = opacity > 0.55 ? 'auto' : 'none';
        if (active) entry.el.removeAttribute('inert');
        else entry.el.setAttribute('inert', '');
      }
      entry.timeline?.progress(entry.local);
    });

    const pct = Math.round(p * 100);
    if (pct !== last.percent) {
      last.percent = pct;
      if (percent) percent.textContent = String(pct).padStart(2, '0');
    }
    if (roadFill) roadFill.style.setProperty('--road-progress', String(clamp(p, 0.002, 1)));

    const servicesEntry = sceneData.find((entry) => entry.id === 'services');
    const serviceIndex = servicesEntry
      ? clamp(Math.floor(servicesEntry.local * serviceSlides.length), 0, serviceSlides.length - 1)
      : 0;
    if (serviceIndex !== last.service) {
      last.service = serviceIndex;
      serviceSlides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === serviceIndex && scene.id === 'services');
        slide.setAttribute('aria-hidden', index === serviceIndex && scene.id === 'services' ? 'false' : 'true');
      });
    }

    const fleetEntry = sceneData.find((entry) => entry.id === 'fleet');
    const fleetIndex = fleetEntry
      ? clamp(Math.floor(fleetEntry.local * fleetRows.length), 0, fleetRows.length - 1)
      : 0;
    if (fleetIndex !== last.fleet) {
      last.fleet = fleetIndex;
      fleetRows.forEach((row, index) => row.classList.toggle('is-active', index === fleetIndex));
    }

    const destEntry = sceneData.find((entry) => entry.id === 'destinations');
    const destIndex = destEntry
      ? clamp(Math.floor(destEntry.local * destSlides.length), 0, destSlides.length - 1)
      : 0;
    if (destIndex !== last.dest) {
      last.dest = destIndex;
      destSlides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === destIndex && scene.id === 'destinations');
      });
      destButtons.forEach((button, index) => button.classList.toggle('is-current', index === destIndex));
    }

    const trustEntry = sceneData.find((entry) => entry.id === 'why');
    trustRows.forEach((row, index) => {
      const fill = trustEntry ? clamp(trustEntry.local * trustRows.length - index + 0.15, 0, 1) : 0;
      row.style.setProperty('--fill', fill.toFixed(3));
      row.classList.toggle('is-active', Boolean(trustEntry) && fill > 0.18 && scene.id === 'why');
    });

    const reviewEntry = sceneData.find((entry) => entry.id === 'reviews');
    const reviewIndex = reviewEntry
      ? clamp(Math.floor(reviewEntry.local * reviewRows.length), 0, reviewRows.length - 1)
      : 0;
    if (reviewIndex !== last.review) {
      last.review = reviewIndex;
      reviewRows.forEach((row, index) => {
        row.classList.toggle('is-active', index === reviewIndex && scene.id === 'reviews');
      });
    }

    if (heroCue) heroCue.style.opacity = String(clamp(1 - p / 0.045, 0, 1));
  };

  const master = gsap.timeline({
    scrollTrigger: {
      trigger: '#film',
      start: 'top top',
      end: 'bottom bottom',
      scrub: reduced ? false : 1.15,
      invalidateOnRefresh: true,
      onRefresh: () => {
        applyTiming();
      },
      onUpdate: (self) => {
        engine?.setProgress(self.progress);
        sync(self.progress);
      },
    },
  });
  const proxy = { p: 0 };
  master.to(proxy, { p: 1, ease: 'none', duration: 1 });

  applyTiming();
  sync(0);

  return {
    master,
    sync,
    refresh: () => ScrollTrigger.refresh(),
  };
}
