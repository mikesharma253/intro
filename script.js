const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//  now its cursor -------------  btw i'll submit my project today only
const crosshair = document.getElementById('crosshair');
const coords = document.getElementById('crosshair-coords');
window.addEventListener('mousemove', (e) => {
  crosshair.style.left = e.clientX + 'px';
  crosshair.style.top = e.clientY + 'px';
  coords.textContent = String(e.clientX).padStart(3, '0') + ', ' + String(e.clientY).padStart(3, '0');
});

//  ----------scroll-spy nav
const navLinks = document.querySelectorAll('#nav-links a');
const sections = document.querySelectorAll('main section[id]');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach((s) => spyObserver.observe(s));

// ------------reveal-on-scroll for section headers---------hell yeaaaaaaaahhhhhhhhhhhhhhh
document.querySelectorAll('.section').forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// skill issue-----------------------------------------------------------------------------------------------
const measureRows = document.querySelectorAll('.measure-row');
const measureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const row = entry.target;
          const fill = row.querySelector('.measure-fill');
          fill.style.width = row.dataset.value + '%';
          measureObserver.unobserve(row);
        }
    });
}, { threshold: 0.4});

measureRows.forEach((row) => measureObserver.observe(row));

// 0now the rendering part
const PROJECTS = [
{
  title: 'KEYS',
  desc: 'A keychain made by me but in HALLOWEEN THEMED, NAMED AS---XAUUSD',
  tags: ['FIGMA', 'ONSHAPE'],
  category: 'hardware'
},
  {
    title: 'reality.exe',
    desc: 'A cinematic fake operating system running entirely in one HTML file \u2014 CRT effects, draggable windows, mini-games, and an AI that slowly became self-aware.',
    tags: ['HTML', 'CSS', 'JS'],
    category: 'interactive'
  },
  {
    title: 'auto-type Widget',
    desc: 'A small utility that types out text on a page automatically, build to practice working with timers and the DOM.',
    tags: ['javascript'],
    category: 'interactive'
  },
  {
    title: 'The Alpha trader \u2014 Palette',
    desc: '========================================================================================.',
    tags: ['design', 'color'],
    category: 'visual',
  },
  {
    title:'The Alpha Trader \u2014 palette',
    desc: '-----------------------------------------------------------------------------------------',
    tags: ['CSS'],
    category: 'visual'
  }
];

const grid = document.getElementById('project-grid');

function renderProjects() {
  grid.innerHTML = '';
  PROJECTS.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.category = p.category;
    card.innerHTML =
      '<p class="project-fig">|||' + String(i + 1).padStart(2, '0') + '</p>' +
      '<h3 class="project-title">' + p.desc + '</h3>' +
      '<p class="project-desc">' + p.desc + '</p>' +
      '<div class="project-tags">' + p.tags.map((t) => '<span>' + t + '</span').join('') + '</div>';
    grid.appendChild(card);
  });
}
renderProjects();

// favourate thing of women--------- filter //
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
     const show = filter === 'all' || card.dataset.filter;
     card.classList.toggle('hidden', !show);
    });
  });
});

// contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]')

function validateField(field) {
  const wrapper = field.closest('.field');
  const valid = field.checkvalidity();
  wrapper.classList.toggle('invalid', !valid);
  return valid;
}

form.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('blur',() => validateField(field));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = Array.form(form.querySelectorAll('input, textarea'));
  const allValid = field.map(validatefield).every(boolean);

  if (!allValid) {
    status.textcontent = 'Check the highlighted fields before sending.';
    status.classList.remove('sucess');
    return;
  }

  submitBtn.disabled = true;
  status.textContent = 'Sending\u2026';
  status.classList.remove('success');

  // send \u2014 wire this up to a real backend -----------ufff
  setTimeout(() => {
    status.textContent = 'message send. Thanks for reaching out.';
    status.classList.add('success');
    submitBtn.disabled = false;
    form.requestFullscreen();
  }, 1000);
});