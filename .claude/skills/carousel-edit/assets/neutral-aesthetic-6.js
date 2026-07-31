/**
 * neutral-aesthetic-6.js
 * ----------------------------------------------------------------------------
 * A self-contained color-grade module that reproduces the "Neutral Aesthetic 6"
 * Lightroom/Camera Raw preset as pixel operations. No dependencies, no .xmp,
 * no parser — the preset's settings are baked into SETTINGS below.
 *
 * This is a close APPROXIMATION of the look (not Adobe's raw engine). It runs on
 * already-rendered 8-bit sRGB images (JPEG/PNG), which is what you want in-app.
 *
 * USAGE (browser / canvas) ---------------------------------------------------
 *   import { applyNeutralAesthetic6 } from './neutral-aesthetic-6.js';
 *   const ctx = canvas.getContext('2d');
 *   ctx.drawImage(img, 0, 0);
 *   const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
 *   applyNeutralAesthetic6(id, canvas.width, canvas.height); // mutates in place
 *   ctx.putImageData(id, 0, 0);
 *   // optional film grain (draws on the context after putImageData):
 *   applyGrain(ctx, canvas.width, canvas.height);
 *
 * USAGE (Node, e.g. with node-canvas or sharp->raw) --------------------------
 *   Pass any object with a `.data` Uint8ClampedArray of RGBA bytes and the
 *   width/height. Works the same as ImageData.
 * ----------------------------------------------------------------------------
 */

// Exact parsed values from "Neutral Aesthetic 6.xmp"
export const SETTINGS = {
  temp: 20, tint: 10,          // IncrementalTemperature / Tint
  exposure: 0.30,              // Exposure2012 (EV)
  contrast: -1,
  highlights: -53, shadows: -7, whites: -51, blacks: 3,
  clarity: -10, dehaze: -12, texture: -5,
  vibrance: -4, saturation: -10,
  hsl: { // [hueShift, sat, lum] per band, Lightroom -100..100 units
    Red:     [ 5,   0,  0],
    Orange:  [ 0, -10, 15],
    Yellow:  [-30,-35,  0],
    Green:   [ 30,-30,  0],
    Aqua:    [ 10,  0,  0],
    Blue:    [ 10,-20,  0],
    Purple:  [ 0, -15,  0],
    Magenta: [ 0, -15,  0],
  },
  splitShadow:    { hue: 42, sat: 4 },
  splitHighlight: { hue: 46, sat: 4 },
  splitBalance: 0,
  colorGradeMid:  { hue: 51, sat: 8 },
  calibration: { redHue: 5, redSat: 5, greenHue: 5, greenSat: 0, blueHue: 0, blueSat: 0 },
  grain: 4,        // 0..100
  vignette: 0,     // PostCropVignetteAmount (0 = none)
  toneCurve:      [[0,16],[68,50],[124,126],[197,207],[255,250]],
  toneCurveRed:   null, // identity in this preset
  toneCurveGreen: null,
  toneCurveBlue:  [[0,0],[65,67],[129,129],[186,186],[255,255]], // ~identity, negligible
};

const BAND_CENTERS = { Red:0, Orange:30, Yellow:60, Green:120, Aqua:180, Blue:240, Purple:285, Magenta:320 };

const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;

function lutFrom(pts) {
  if (!pts) return null;
  const lut = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    let x = i, j = 0;
    while (j < pts.length - 1 && x > pts[j + 1][0]) j++;
    const a = pts[j], b = pts[Math.min(j + 1, pts.length - 1)];
    const t = b[0] === a[0] ? 0 : (x - a[0]) / (b[0] - a[0]);
    lut[i] = clamp01((a[1] + (b[1] - a[1]) * t) / 255);
  }
  return lut;
}
function applyLUT(v, lut) {
  const x = clamp01(v) * 255, i = Math.floor(x), f = x - i;
  return lut[i] + (lut[Math.min(255, i + 1)] - lut[i]) * f;
}
function rgb2hsl(r, g, b) {
  const mx = Math.max(r,g,b), mn = Math.min(r,g,b); let h, s, l = (mx+mn)/2;
  if (mx === mn) { h = 0; s = 0; }
  else { const d = mx-mn; s = l>0.5 ? d/(2-mx-mn) : d/(mx+mn);
    switch (mx) { case r: h=(g-b)/d+(g<b?6:0); break; case g: h=(b-r)/d+2; break; default: h=(r-g)/d+4; } h/=6; }
  return [h*360, s, l];
}
function hue2rgb(p, q, t){ if(t<0)t+=1; if(t>1)t-=1; if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p; }
function hsl2rgb(h, s, l){ h/=360; let r,g,b; if(s===0){r=g=b=l;} else { const q=l<0.5?l*(1+s):l+s-l*s, p=2*l-q; r=hue2rgb(p,q,h+1/3); g=hue2rgb(p,q,h); b=hue2rgb(p,q,h-1/3);} return [r,g,b]; }
function hueW(h, c, w){ const d = Math.abs(((h-c+540)%360)-180); return Math.exp(-(d*d)/(2*w*w)); }

/**
 * Apply the grade in place to an ImageData-like object. Mutates id.data.
 */
export function applyNeutralAesthetic6(id, W, H, s = SETTINGS) {
  const d = id.data;
  const smooth = t => t<=0?0:t>=1?1:t*t*(3-2*t);
  const expBright = s.exposure >= 0;
  const expM = Math.pow(2, Math.abs(s.exposure) * 0.8);
  const contrast = (s.contrast/100) * 0.55;
  const micro = (s.dehaze/100)*0.28 + (s.clarity/100)*0.14;
  const satG = s.saturation/100, vib = s.vibrance/100;
  const hiTint = hsl2rgb(s.splitHighlight.hue,1,0.5), shTint = hsl2rgb(s.splitShadow.hue,1,0.5), midTint = hsl2rgb(s.colorGradeMid.hue,1,0.5);
  const hiAmt = (s.splitHighlight.sat/100)*0.5, shAmt = (s.splitShadow.sat/100)*0.5, midAmt = (s.colorGradeMid.sat/100)*0.45;
  const balHi = clamp01(0.5 + s.splitBalance/200), balSh = clamp01(0.5 - s.splitBalance/200);
  const mainLUT = lutFrom(s.toneCurve), redLUT = lutFrom(s.toneCurveRed), grnLUT = lutFrom(s.toneCurveGreen), bluLUT = lutFrom(s.toneCurveBlue);
  const cal = s.calibration;

  // Precompute hue-only LUTs (no Math.exp in the pixel loop)
  const satLUT = new Float32Array(360), hueLUT = new Float32Array(360), lumLUT = new Float32Array(360);
  const keys = Object.keys(BAND_CENTERS);
  for (let hh = 0; hh < 360; hh++) {
    let sm=0, ha=0, la=0;
    for (const k of keys) { const w = hueW(hh, BAND_CENTERS[k], 28);
      if (w > 0.0005) { const [hu, sa, lu] = s.hsl[k]; sm += (sa/100)*w; ha += (hu*0.30)*w; la += (lu/100)*w; } }
    const wR = hueW(hh,0,40), wG = hueW(hh,120,45), wB = hueW(hh,240,45);
    ha += cal.redHue*0.18*wR + cal.greenHue*0.18*wG + cal.blueHue*0.18*wB;
    sm += (cal.redSat/100)*0.4*wR + (cal.greenSat/100)*0.4*wG + (cal.blueSat/100)*0.4*wB;
    satLUT[hh]=sm; hueLUT[hh]=ha; lumLUT[hh]=la;
  }

  for (let i = 0; i < d.length; i += 4) {
    let r = d[i]/255, g = d[i+1]/255, b = d[i+2]/255;
    const L0 = 0.2126*r + 0.7152*g + 0.0722*b;
    const clipGuard = 1 - smooth((L0 - 0.90) / 0.10);

    // white balance
    const tw = s.temp*0.0030, tn = s.tint*0.0028;
    r = clamp01(r + tw - tn*0.3); b = clamp01(b - tw); g = clamp01(g - tn + tw*0.1);

    // exposure
    if (expBright) { r = 1-(1-r)/((1-r)*(expM-1)+1); g = 1-(1-g)/((1-g)*(expM-1)+1); b = 1-(1-b)/((1-b)*(expM-1)+1); }
    else { const im = 1/expM; r*=im; g*=im; b*=im; }

    // tonal regions
    let L = 0.2126*r + 0.7152*g + 0.0722*b;
    const hiW = clamp01((L-0.5)/0.5), shW = clamp01((0.5-L)/0.5), whW = clamp01((L-0.78)/0.22), blW = clamp01((0.30-L)/0.30);
    const dL = (s.highlights/100)*0.16*clipGuard*hiW + (s.shadows/100)*0.18*shW + (s.whites/100)*0.13*clipGuard*whW + (s.blacks/100)*0.16*blW;
    const Ln = clamp01(L + dL), sc = L > 0.001 ? Ln/L : 1; r*=sc; g*=sc; b*=sc;

    // contrast + micro (dehaze/clarity)
    const cc = 1 + contrast + micro;
    r = clamp01((r-0.5)*cc+0.5); g = clamp01((g-0.5)*cc+0.5); b = clamp01((b-0.5)*cc+0.5);

    // tone curves
    if (redLUT) r = applyLUT(r, redLUT); if (grnLUT) g = applyLUT(g, grnLUT); if (bluLUT) b = applyLUT(b, bluLUT);
    if (mainLUT) { r = applyLUT(r, mainLUT); g = applyLUT(g, mainLUT); b = applyLUT(b, mainLUT); }

    // HSL bands + calibration + sat/vibrance
    let [h, sl, l] = rgb2hsl(clamp01(r), clamp01(g), clamp01(b));
    const hi3 = ((h|0)%360+360)%360;
    const satMul = 1 + satG + vib*(1-sl) + satLUT[hi3];
    sl = clamp01(sl*satMul); h = (h + hueLUT[hi3] + 360) % 360; l = clamp01(l*(1 + lumLUT[hi3]*0.5));
    [r, g, b] = hsl2rgb(h, sl, l);

    // split tone + midtone color grade
    L = 0.2126*r + 0.7152*g + 0.0722*b;
    const wSh = clamp01(1-L*1.7)*balSh*2, wHi = clamp01((L-0.5)*2)*balHi*2, wMid = 1 - Math.abs(L-0.5)*2;
    r = clamp01(r + (shTint[0]-0.5)*shAmt*wSh + (midTint[0]-0.5)*midAmt*wMid + (hiTint[0]-0.5)*hiAmt*wHi);
    g = clamp01(g + (shTint[1]-0.5)*shAmt*wSh + (midTint[1]-0.5)*midAmt*wMid + (hiTint[1]-0.5)*hiAmt*wHi);
    b = clamp01(b + (shTint[2]-0.5)*shAmt*wSh + (midTint[2]-0.5)*midAmt*wMid + (hiTint[2]-0.5)*hiAmt*wHi);

    d[i] = clamp01(r)*255; d[i+1] = clamp01(g)*255; d[i+2] = clamp01(b)*255;
  }
  return id;
}

/** Optional: subtle film grain, drawn on a 2D context after putImageData. */
export function applyGrain(ctx, W, H, amount = SETTINGS.grain) {
  if (!amount) return;
  const amp = (amount/100) * 16;
  const gn = ctx.getImageData(0, 0, W, H), gd = gn.data;
  for (let i = 0; i < gd.length; i += 4) {
    const n = (Math.random() - 0.5) * amp;
    gd[i]   = Math.max(0, Math.min(255, gd[i]   + n));
    gd[i+1] = Math.max(0, Math.min(255, gd[i+1] + n));
    gd[i+2] = Math.max(0, Math.min(255, gd[i+2] + n));
  }
  ctx.putImageData(gn, 0, 0);
}

// CommonJS fallback (Node without ESM)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SETTINGS, applyNeutralAesthetic6, applyGrain };
}
