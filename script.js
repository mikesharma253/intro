const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// now its cursor ------------- btw i'll submit my project today only

const crosshair = document.getElementById('crosshair');
const coords = document.getElementById('crosshair-coords');

window.addEventListener('mousemove', (e) => {
  crosshair.style.left = e.clientX + 'px';
  crosshair.style.top = e.clientY + 'px';
  coords.textContent = String(e.clientX).padStart(3, '0') + ', ' + String(e.clientY).padStart(3, '0');
});

// ----------scroll-spy nav

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
}, { threshold: 0.4 });

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
    title: 'METEOR SURVIVAL',
    desc: 'A Python game where you survive falling meteors, shoot projectiles, and avoid collisions while the difficulty increases.',
    tags: ['PYTHON', 'PYGAME'],
    category: 'software'
  },

  {
    title: 'MIKE — PORTFOLIO',
    desc: 'A custom interactive portfolio built from scratch with a dark Halloween-themed interface, animations, custom cursor, and responsive design.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    category: 'software'
  },

  {
    title: 'TRADING-XP',
    desc: 'A project exploring trading concepts and market analysis while combining my interest in finance with technology.',
    tags: ['TRADING', 'JAVASCRIPT'],
    category: 'software'
  },

  {
    title: 'NYRO',
    desc: 'An experimental project built to explore new ideas, interactions, and creative development beyond standard tutorials.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    category: 'software'
  },

    {
    title: 'WINNING PROJECT',
    desc: 'A project built to experiment with ideas, problem-solving, and turning concepts into a working digital project.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    category: 'software'
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
      '<h3 class="project-title">' + p.title + '</h3>' +
      '<p class="project-desc">' + p.desc + '</p>' +
      '<div class="project-tags">' +
      p.tags.map((t) => '<span>' + t + '</span>').join('') +
      '</div>';

    grid.appendChild(card);
  });
}

renderProjects();

// favourate thing of women--------- filter //*

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    document.querySelectorAll('.project-card').forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;

      card.classList.toggle('hidden', !show);
    });
  });
});

// contact form

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]');

function validateField(field) {
  const wrapper = field.closest('.field');
  const valid = field.checkValidity();

  wrapper.classList.toggle('invalid', !valid);

  return valid;
}

form.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('blur', () => validateField(field));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = Array.from(form.querySelectorAll('input, textarea'));
  const allValid = fields.map(validateField).every(Boolean);

  if (!allValid) {
    status.textContent = 'Check the highlighted fields before sending.';
    status.classList.remove('success');
    return;
  }

  submitBtn.disabled = true;
  status.textContent = 'Sending…';
  status.classList.remove('success');

  // send — wire this up to a real backend -----------ufff

  setTimeout(() => {
    status.textContent = 'Message sent. Thanks for reaching out.';
    status.classList.add('success');
    submitBtn.disabled = false;
    form.reset();
  }, 1000);
});