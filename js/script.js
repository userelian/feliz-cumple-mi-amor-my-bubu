/* =========================================================
   Feliz Cumpleaños — animaciones y interacciones
   Paleta: rosa, rojo, morado, blanco (sin amarillo)
   ========================================================= */

/* ---------- 1. PÉTALOS CAYENDOS (canvas) ---------- */
(() => {
  const canvas = document.getElementById('petals');
  const ctx = canvas.getContext('2d');
  let W, H;
  const COLORS = ['#e91e63', '#f48fb1', '#9c27b0', '#ff80ab', '#ce93d8', '#ef5350', '#ffffff'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Petal {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : -30;
      this.size = 6 + Math.random() * 10;
      this.speedY = .6 + Math.random() * 1.6;
      this.speedX = -.8 + Math.random() * 1.6;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (-.5 + Math.random()) * .04;
      this.color = COLORS[(Math.random() * COLORS.length) | 0];
      this.sway = Math.random() * Math.PI * 2;
      this.alpha = .55 + Math.random() * .45;
    }
    update() {
      this.sway += .02;
      this.x += this.speedX + Math.sin(this.sway) * .6;
      this.y += this.speedY;
      this.rot += this.rotSpeed;
      if (this.y > H + 30 || this.x < -40 || this.x > W + 40) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * .55, this.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const count = Math.min(70, Math.floor(window.innerWidth / 18));
  const petals = Array.from({ length: count }, () => new Petal());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();
})();

/* ---------- 2. SPARKLES ---------- */
(() => {
  const box = document.getElementById('sparkles');
  for (let i = 0; i < 45; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle' + (Math.random() > .6 ? ' pink' : '');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = Math.random() * 3 + 's';
    s.style.animationDuration = 2 + Math.random() * 3 + 's';
    box.appendChild(s);
  }
})();

/* ---------- 3. CORAZONES FLOTANTES ---------- */
const HEARTS = ['💗', '💜', '💖', '🌸', '🌷', '❤️', '🌺'];
function spawnHeart(x, y) {
  const box = document.getElementById('hearts');
  const h = document.createElement('span');
  h.className = 'heart';
  h.textContent = HEARTS[(Math.random() * HEARTS.length) | 0];
  h.style.left = (x ?? Math.random() * 100) + '%';
  if (y !== undefined) h.style.top = y + 'px', h.style.bottom = 'auto';
  h.style.fontSize = 16 + Math.random() * 18 + 'px';
  h.style.animationDuration = 5 + Math.random() * 5 + 's';
  box.appendChild(h);
  setTimeout(() => h.remove(), 10000);
}
setInterval(() => { if (document.visibilityState === 'visible') spawnHeart(); }, 900);

document.addEventListener('click', e => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => spawnHeart(
      (e.clientX / window.innerWidth) * 100,
      e.clientY - Math.random() * 40
    ), i * 90);
  }
});

/* ---------- 4. REVEAL AL HACER SCROLL ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
}, { threshold: .15 });
document.querySelectorAll('.reveal, .garden-bed').forEach(el => io.observe(el));

/* ---------- 5. BOTÓN PORTADA → RECUERDOS ---------- */
document.getElementById('startBtn').addEventListener('click', () => {
  burstConfetti(60);
  document.getElementById('memories').scrollIntoView({ behavior: 'smooth' });
});

/* ---------- 6. PASTEL: apagar velas ---------- */
const candles = [...document.querySelectorAll('.candle')];
const cakeMsg = document.getElementById('cakeMsg');
let outCount = 0;

candles.forEach(c => {
  c.addEventListener('click', () => {
    if (c.classList.contains('out')) return;
    c.classList.add('out');
    outCount++;
    const remaining = candles.length - outCount;
    cakeMsg.textContent = remaining > 0
      ? `🔥 Quedan ${remaining} vela${remaining > 1 ? 's' : ''}...`
      : '';
    if (remaining === 0) {
      cakeMsg.textContent = '🎉 ¡Deseo cumplido! Te amo 💜';
      cakeMsg.classList.add('win');
      burstConfetti(150);
      setTimeout(() => {
        candles.forEach(x => x.classList.remove('out'));
        outCount = 0;
        cakeMsg.classList.remove('win');
        cakeMsg.textContent = '✨ Otra vez, si quieres ✨';
      }, 5000);
    }
  });
});

/* ---------- 7. CARDS: razones ---------- */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const wasFlipped = card.classList.contains('flipped');
    document.querySelectorAll('.card').forEach(c => c.classList.remove('flipped'));
    if (!wasFlipped) {
      card.classList.add('flipped');
      burstConfetti(25);
    }
  });
});

/* ---------- 8. CONFETI ---------- */
const CONFETTI_COLORS = ['#e91e63', '#f48fb1', '#9c27b0', '#ff80ab', '#ce93d8', '#ef5350', '#ffffff', '#ba68c8'];
function burstConfetti(n = 100) {
  for (let i = 0; i < n; i++) {
    const p = document.createElement('span');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0];
    p.style.width = 6 + Math.random() * 8 + 'px';
    p.style.height = 10 + Math.random() * 12 + 'px';
    p.style.animationDuration = 2.2 + Math.random() * 2.5 + 's';
    p.style.animationDelay = Math.random() * .6 + 's';
    if (Math.random() > .5) p.style.borderRadius = '50%';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 6000);
  }
}
document.getElementById('confettiBtn').addEventListener('click', () => burstConfetti(160));

/* ---------- 9. PARALLAX SUAVE EN EL HERO ---------- */
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    hero.style.transform = `translateY(${y * .25}px)`;
    hero.style.opacity = 1 - y / (window.innerHeight * 1.1);
  }
}, { passive: true });

/* ---------- 10. SORPRESA: doble clic en el título ---------- */
document.querySelector('.hero-title').addEventListener('dblclick', () => {
  burstConfetti(200);
  const msg = document.getElementById('cakeMsg');
  if (msg) msg.textContent = '💖 ¡Sorpresa!';
});
