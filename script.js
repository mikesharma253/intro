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
    entries.foreach((entry) => {
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
    title: 'particle Visualizer',
    desc: 'A  gesture-controlled particle field build with Three.js and mediaPipe Hands \u2014 move a hand in front of the camera and the particles bend toward it.',
    tags: ['Three.js', 'mediaPipe'],
    category: 'interactive'
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
    category: 'visual'
  }
  {
    title:'The Alpha Trader \u2014 palette',
    desc: '-----------------------------------------------------------------------------------------',
    tags: ['CSS'],
    category: 'visual'
  }
];
