const projects = [
  { number: '01', name: 'NORTE ABIERTO', type: 'Production / Editing', year: '2026', image: '' },
  { number: '02', name: 'EN MOVIMIENTO', type: 'Creative Direction / Film', year: '2026', image: '' },
  { number: '03', name: 'TIERRA FIRME', type: 'Production / Post-production', year: '2025', image: '' },
  { number: '04', name: 'NOCHE LARGA', type: 'Film / Editing', year: '2025', image: '' },
  { number: '05', name: 'OTRA FORMA', type: 'Campaign / Content', year: '2025', image: '' }
];

const projectsContainer = document.querySelector('#projects');
projectsContainer.innerHTML = projects.map((project) => {
  const visual = project.image
    ? `<img src="${project.image}" alt="${project.name}">`
    : `<span>PROJECT IMAGE ${project.number}</span>`;
  return `<article class="project reveal"><span class="project-number">${project.number}</span><a class="project-visual" href="#contact" aria-label="Ver ${project.name}">${visual}</a><div class="project-info"><h3>${project.name}</h3><p>${project.type}</p><p>${project.year}</p><a href="#contact">VIEW PROJECT <span>→</span></a></div></article>`;
}).join('');

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
