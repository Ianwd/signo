const header = document.querySelector('.header');
const toggleBtn = document.querySelector('.nav__toggle');

export function init() {
  listen();
}

function listen() {
  toggleBtn.addEventListener('click', () => {
    toggle();
  });
}

function toggle() {
  document.querySelector('.nav__mobileContainer').style.display = 'block';
  requestAnimationFrame(() => header.classList.toggle('nav__mobile--active'));
}
