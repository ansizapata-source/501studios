const projects = [
  { name: 'Spot GDS', type: 'Production / Editing', year: '2026', videoUrl: 'https://pub-1e8c1ed9130c49e3b7a11b665cfcde03.r2.dev/Spot_GDS_v02.mp4' },
  { name: 'Spot Hidráulica Mattig', type: 'Production / Editing', year: '2026', videoUrl: 'https://pub-1e8c1ed9130c49e3b7a11b665cfcde03.r2.dev/Spot_HM_vf.mp4', moreInfoUrl: 'https://www.behance.net/gallery/252637141/Spot-Publicitario-Hidraulica-Mattig' },
  { name: 'Fiesta Nacional Del Tractor edición 2026', type: 'Production / Editing', year: '2026', videoUrl: 'https://pub-1e8c1ed9130c49e3b7a11b665cfcde03.r2.dev/FiestaNacDelTractor_2026.mp4' },
  { name: 'Moltec x Tándem', type: 'Filming / Editing B2B', year: '2026', videoUrl: '' },
  { name: 'Bounous x Tándem', type: 'Filming / Editing B2B', year: '2026', videoUrl: '' },
];

const projectsContainer = document.querySelector('#projects');
projectsContainer.innerHTML = projects.map((project, index) => {
  const visual = project.videoUrl
    ? `<video preload="metadata" playsinline${index === 0 ? ' controls' : ''}><source src="${project.videoUrl}" alt="${project.name}" type="video/mp4"></source></video>`
    : `<span>PROJECT IMAGE</span>`;
  const moreInfo = project.moreInfoUrl
    ? `<p>-</p><a class="project-more-info" href="${project.moreInfoUrl}" target="_blank" rel="noreferrer">VER MÁS <span aria-hidden="true">↗</span></a>`
    : '';
  return `<article class="project${index === 0 ? ' is-active' : ''}"><div class="project-visual" aria-label="${project.name}">${visual}</div><div class="project-info"><h3>${project.name}</h3><p>${project.type}</p><p>-</p><p>${project.year}</p>${moreInfo}</div></article>`;
}).join('');

const projectDots = document.querySelector('#project-dots');
let activeProject = 0;
let videoControlsTimer;
let touchStart;
let ignoreProjectClickUntil = 0;

const sliderViewport = document.querySelector('.slider-viewport');
projectDots.innerHTML = projects.map((project, index) => `<button class="slider-dot${index === 0 ? ' is-active' : ''}" type="button" aria-label="Ver ${project.name}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('');

function showProject(index) {
  activeProject = (index + projects.length) % projects.length;
  const activeSlide = projectsContainer.children[activeProject];
  const offset = activeSlide.offsetLeft - (sliderViewport.clientWidth - activeSlide.offsetWidth) / 2;
  sliderViewport.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
  projectsContainer.querySelectorAll('.project').forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === activeProject);
    slide.querySelectorAll('video').forEach((video) => {
      video.controls = false;
      if (slideIndex !== activeProject) video.pause();
    });
  });
  projectDots.querySelectorAll('.slider-dot').forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeProject;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', String(isActive));
  });
  window.clearTimeout(videoControlsTimer);
  videoControlsTimer = window.setTimeout(() => {
    activeSlide.querySelectorAll('video').forEach((video) => { video.controls = true; });
  }, 560);
}

projectDots.querySelectorAll('.slider-dot').forEach((dot, index) => dot.addEventListener('click', () => showProject(index)));
projectsContainer.querySelectorAll('.project').forEach((project, index) => project.addEventListener('click', () => {
  if (Date.now() >= ignoreProjectClickUntil && index !== activeProject) showProject(index);
}));

sliderViewport.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  touchStart = { x: touch.clientX, y: touch.clientY };
}, { passive: true });

sliderViewport.addEventListener('touchend', (event) => {
  if (!touchStart) return;
  const touch = event.changedTouches[0];
  const distanceX = touch.clientX - touchStart.x;
  const distanceY = touch.clientY - touchStart.y;
  touchStart = null;

  if (Math.abs(distanceX) < 45 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
  ignoreProjectClickUntil = Date.now() + 700;
  showProject(activeProject + (distanceX < 0 ? 1 : -1));
}, { passive: true });

sliderViewport.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
projectDots.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') showProject(activeProject + 1);
  if (event.key === 'ArrowLeft') showProject(activeProject - 1);
});
window.addEventListener('resize', () => showProject(activeProject));

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.fullscreen-menu');
function closeMenu() { menu.classList.remove('is-open'); menuToggle.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true'); document.body.classList.remove('menu-open'); }
function toggleMenu() { const open = !menu.classList.contains('is-open'); if (open) { menu.classList.add('is-open'); menuToggle.classList.add('is-open'); menuToggle.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-hidden', 'false'); document.body.classList.add('menu-open'); } else closeMenu(); }
menuToggle.addEventListener('click', toggleMenu);
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.accordion-item').forEach((entry) => { entry.classList.remove('is-open'); entry.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false'); });
    if (!isOpen) { item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); }
  });
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
