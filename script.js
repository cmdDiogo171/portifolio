const elementos = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.1 });

elementos.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});

const canvas = document.getElementById('pcb-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const linhas = [];
const QTD = 28;

for (let i = 0; i < QTD; i++) {
  linhas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() < 0.5 ? 1 : -1) * (0.6 + Math.random()),
    dy: 0,
    len: 0,
    maxLen: 40 + Math.random() * 70,
    alpha: 0.12 + Math.random() * 0.25
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  linhas.forEach(l => {
    ctx.strokeStyle = `rgba(77, 163, 255, ${l.alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    l.x += l.dx;
    l.y += l.dy;
    l.len++;
    ctx.lineTo(l.x, l.y);
    ctx.stroke();

    if (l.len > l.maxLen || l.x < 0 || l.x > canvas.width || l.y < 0 || l.y > canvas.height) {
      l.x = Math.random() * canvas.width;
      l.y = Math.random() * canvas.height;
      l.dx = (Math.random() < 0.5 ? 1 : -1) * (0.6 + Math.random());
      l.dy = 0;
      l.len = 0;
      l.maxLen = 40 + Math.random() * 70;
    }

    if (Math.random() < 0.015) {
      l.dy = l.dx;
      l.dx = 0;
    }

    if (Math.random() < 0.015) {
      l.dx = l.dy;
      l.dy = 0;
    }
  });

  requestAnimationFrame(draw);
}

draw();