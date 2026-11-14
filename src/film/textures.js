import * as THREE from 'three';

export const FONT_DISPLAY = '"Anton", "Arial Narrow", Impact, sans-serif';
export const FONT_BODY = '"Manrope", "Helvetica Neue", Arial, sans-serif';

function makeTexture(width, height, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Soft radial light / mist / shadow sprite. */
export function makeGlowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)', size = 128) {
  return makeTexture(size, size, (ctx, w, h) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gradient.addColorStop(0, inner);
    gradient.addColorStop(0.42, inner.replace(/[\d.]+\)$/, '0.5)'));
    gradient.addColorStop(1, outer);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  });
}

/** Horizontal light streak used for flares, tail lights and motion trails. */
export function makeStreakTexture(color = 'rgba(255,255,255,0.9)') {
  return makeTexture(512, 64, (ctx, w, h) => {
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, color.replace(/[\d.]+\)$/, '0)'));
    gradient.addColorStop(0.2, color);
    gradient.addColorStop(0.8, color);
    gradient.addColorStop(1, color.replace(/[\d.]+\)$/, '0)'));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Feather the top / bottom edges so the plane never shows a hard line.
    ctx.globalCompositeOperation = 'destination-in';
    const soft = ctx.createLinearGradient(0, 0, 0, h);
    soft.addColorStop(0, 'rgba(0,0,0,0)');
    soft.addColorStop(0.5, 'rgba(0,0,0,1)');
    soft.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = soft;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';
  });
}

/**
 * Canvas typography for in-world copy.
 * lines can be supplied to control the line breaks exactly (used by the
 * review planes), otherwise the text is split on newlines.
 */
export function makeTextTexture(text = '', options = {}) {
  const {
    width = 1024,
    height = 256,
    font = FONT_DISPLAY,
    fontSize = 120,
    weight = '400',
    color = '#f4efe6',
    lineHeight = 1.16,
    lines,
    align = 'center',
    glow = '',
    glowBlur = 0,
    letterSpacing = 0,
    padding = 24,
  } = options;

  return makeTexture(width, height, (ctx) => {
    ctx.clearRect(0, 0, width, height);
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.font = `${weight} ${fontSize}px ${font}`;
    if (letterSpacing) {
      // Modern canvas supports letterSpacing; ignored where unsupported.
      ctx.letterSpacing = `${letterSpacing}px`;
    }
    ctx.fillStyle = color;
    if (glow) {
      ctx.shadowColor = glow;
      ctx.shadowBlur = glowBlur;
    }

    const rows = (lines && lines.length ? lines : String(text).split('\n')).filter(
      (row) => row !== undefined && row !== null,
    );
    const advance = fontSize * lineHeight;
    const total = advance * rows.length;
    const start = height / 2 - total / 2 + advance / 2;
    const x = align === 'center' ? width / 2 : padding;

    rows.forEach((row, index) => {
      ctx.fillText(row, x, start + index * advance, width - padding * 2);
    });
  });
}

/** Service gantry sign: index, big word, meta strip. */
export function makeSignTexture(short = '', meta = '', index = '01') {
  return makeTexture(1024, 360, (ctx, w, h) => {
    const background = ctx.createLinearGradient(0, 0, 0, h);
    background.addColorStop(0, 'rgba(8,19,20,0.96)');
    background.addColorStop(1, 'rgba(4,10,11,0.96)');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);

    // Amber edge glow + frame
    const edge = ctx.createLinearGradient(0, 0, 0, h);
    edge.addColorStop(0, 'rgba(242,165,65,0.9)');
    edge.addColorStop(0.5, 'rgba(242,165,65,0.18)');
    edge.addColorStop(1, 'rgba(242,165,65,0.9)');
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, 5, h);
    ctx.fillRect(w - 5, 0, 5, h);

    ctx.fillStyle = 'rgba(242,165,65,0.85)';
    ctx.fillRect(46, 54, 42, 2);

    ctx.font = `800 26px ${FONT_BODY}`;
    ctx.fillStyle = 'rgba(242,165,65,0.92)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${index} / SERVICE`, 102, 56);

    ctx.font = `400 148px ${FONT_DISPLAY}`;
    ctx.fillStyle = '#f4efe6';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(short).toUpperCase(), w / 2, h * 0.53, w - 120);

    ctx.font = `800 24px ${FONT_BODY}`;
    ctx.fillStyle = 'rgba(244,239,230,0.52)';
    ctx.textAlign = 'left';
    ctx.fillText(String(meta).toUpperCase(), 46, h - 46);

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(244,239,230,0.34)';
    ctx.fillText('KARNAIL TOUR & TRAVELS', w - 46, h - 46);

    ctx.fillStyle = 'rgba(242,165,65,0.7)';
    ctx.fillRect(46, h - 72, w - 92, 1);
  });
}

/** Small generic in-world label (kept for scene props / future use). */
export function makeLabelTexture(text = '', options = {}) {
  return makeTextTexture(text, {
    width: 512,
    height: 128,
    fontSize: 48,
    color: '#f4efe6',
    letterSpacing: 4,
    ...options,
  });
}
