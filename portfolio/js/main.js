const projects = [
  { name: 'NORTE ABIERTO', type: 'Production / Editing', year: '2026', image: '' },
  { name: 'EN MOVIMIENTO', type: 'Creative Direction / Film', year: '2026', image: '' },
  { name: 'TIERRA FIRME', type: 'Production / Post-production', year: '2025', image: '' },
  { name: 'NOCHE LARGA', type: 'Film / Editing', year: '2025', image: '' },
  { name: 'OTRA FORMA', type: 'Campaign / Content', year: '2025', image: '' }
];

const projectsContainer = document.querySelector('#projects');
projectsContainer.innerHTML = projects.map((project) => {
  const visual = project.image
    ? `<img src="${project.image}" alt="${project.name}">`
    : `<span>PROJECT IMAGE</span>`;
  return `<article class="project"><div class="project-visual" aria-label="${project.name}">${visual}</div><div class="project-info"><h3>${project.name}</h3><p>${project.type}</p><p>${project.year}</p></div></article>`;
}).join('');

const projectDots = document.querySelector('#project-dots');
let activeProject = 0;

const sliderViewport = document.querySelector('.slider-viewport');
projectDots.innerHTML = projects.map((project, index) => `<button class="slider-dot${index === 0 ? ' is-active' : ''}" type="button" aria-label="Ver ${project.name}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('');

function showProject(index) {
  activeProject = (index + projects.length) % projects.length;
  const activeSlide = projectsContainer.children[activeProject];
  const offset = activeSlide.offsetLeft - (sliderViewport.clientWidth - activeSlide.clientWidth) / 2;
  projectsContainer.style.transform = `translateX(-${offset}px)`;
  projectDots.querySelectorAll('.slider-dot').forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeProject;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', String(isActive));
  });
}

projectDots.querySelectorAll('.slider-dot').forEach((dot, index) => dot.addEventListener('click', () => showProject(index)));
projectsContainer.querySelectorAll('.project').forEach((project, index) => project.addEventListener('click', () => showProject(index)));
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
