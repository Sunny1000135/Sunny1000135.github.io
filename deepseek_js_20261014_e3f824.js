const IMAGES = [
  { src: '...', bg: '#F4845F', panel: '#F79B7F' },
  ...
];

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DURATION = 650;

const app = document.getElementById('app');

app.innerHTML = `
  <div class="hero" id="hero">
    <div class="hero-inner">
      <div class="grain"></div>
      <div class="ghost"><span>3D SHAPE</span></div>
      <div class="brand"><span>TOONHUB</span></div>
      <div class="carousel" id="carousel">
        ${IMAGES.map((img, i) => `
          <div class="carousel-item" data-index="${i}">
            <img src="${img.src}" alt="TOONHUB collectible figurine ${i + 1}" draggable="false" />
          </div>
        `).join('')}
      </div>
      <div class="bottom-left">
        <p class="title">TOONHUB FIGURINES</p>
        <p class="desc">The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.</p>
        <div class="nav">
          <button type="button" aria-label="Previous figurine" id="prevBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </button>
          <button type="button" aria-label="Next figurine" id="nextBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      <a href="#discover" class="discover">
        DISCOVER IT
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </div>
`;

const hero = document.getElementById('hero');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let activeIndex = 0;
let isAnimating = false;
let isMobile = window.innerWidth < 640;

function preloadImages() {
  IMAGES.forEach(({ src }) => {
    const img = new Image();
    img.src = src;
  });
}

function getRole(index) {
  const center = activeIndex;
  const left = (activeIndex + 3) % IMAGES.length;
  const right = (activeIndex + 1) % IMAGES.length;
  // back is the remaining one
  if (index === center) return 'center';
  if (index === left) return 'left';
  if (index === right) return 'right';
  return 'back';
}

function applyStyles() {
  hero.style.backgroundColor = IMAGES[activeIndex].bg;

  carouselItems.forEach((item) => {
    const index = Number(item.dataset.index);
    const role = getRole(index);
    const style = item.style;

    // reset common
    style.position = 'absolute';
    style.aspectRatio = '0.6 / 1';
    style.transition = `transform ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}, bottom ${DURATION}ms ${EASE}, height ${DURATION}ms ${EASE}`;
    style.willChange = 'transform, filter, opacity';

    if (role === 'center') {
      style.left = '50%';
      style.bottom = isMobile ? '22%' : '0';
      style.height = isMobile ? '60%' : '92%';
      style.transform = `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`;
      style.filter = 'blur(0px)';
      style.opacity = '1';
      style.zIndex = '20';
    } else if (role === 'left') {
      style.left = isMobile ? '20%' : '30%';
      style.bottom = isMobile ? '32%' : '12%';
      style.height = isMobile ? '16%' : '28%';
      style.transform = 'translateX(-50%) scale(1)';
      style.filter = 'blur(2px)';
      style.opacity = '0.85';
      style.zIndex = '10';
    } else if (role === 'right') {
      style.left = isMobile ? '80%' : '70%';
      style.bottom = isMobile ? '32%' : '12%';
      style.height = isMobile ? '16%' : '28%';
      style.transform = 'translateX(-50%) scale(1)';
      style.filter = 'blur(2px)';
      style.opacity = '0.85';
      style.zIndex = '10';
    } else {
      // back
      style.left = '50%';
      style.bottom = isMobile ? '32%' : '12%';
      style.height = isMobile ? '13%' : '22%';
      style.transform = 'translateX(-50%) scale(1)';
      style.filter = 'blur(4px)';
      style.opacity = '1';
      style.zIndex = '5';
    }
  });
}

function navigate(direction) {
  if (isAnimating) return;
  isAnimating = true;

  if (direction === 'next') {
    activeIndex = (activeIndex + 1) % IMAGES.length;
  } else {
    activeIndex = (activeIndex + IMAGES.length - 1) % IMAGES.length;
  }

  applyStyles();

  window.setTimeout(() => {
    isAnimating = false;
  }, DURATION);
}

function handleResize() {
  const nextIsMobile = window.innerWidth < 640;
  if (nextIsMobile !== isMobile) {
    isMobile = nextIsMobile;
    applyStyles();
  }
}

prevBtn.addEventListener('click', () => navigate('prev'));
nextBtn.addEventListener('click', () => navigate('next'));
window.addEventListener('resize', handleResize);

preloadImages();
applyStyles();