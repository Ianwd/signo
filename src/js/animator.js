import inView from 'in-view';
import * as Viewport from './utils/viewport';
import debounce from 'lodash/debounce';
import * as Type from 'ityped';
import scrollReveal from 'scrollreveal';

const revealCfg = {
  reset: false,
  scale: 1,
  easing: 'cubic-bezier(0.2, 1, 0.25, 1)',
  duration: 2400,
  delay: 0,
  // viewFactor: 0.4,
  viewFactor: 0,
  viewOffset: {
    top: 0,
    right: -128,
    bottom: 150,
    left: -128,
  },
};
const fadeInUp = {
  origin: 'bottom',
  distance: '64px',
  scale: 0.9,
};
const fadeInLeft = {
  origin: 'left',
  distance: '64px',
  scale: 0.98,
};
const fadeInDownFast = {
  origin: 'top',
  distance: '64px',
  duration: 1200,
};
const fadeInUpRotate = {
  origin: 'bottom',
  distance: '32px',
  duration: 1200,
  rotate: {
    x: 0,
    y: 0,
    z: 2,
  },
  delay: 100,
};
const footerAnim = {
  origin: 'left',
  distance: '64px',
  duration: 1200,
  scale: 0.95,
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};
const footerSmall = {
  origin: 'bottom',
  distance: '24px',
  duration: 1200,
  delay: 600,
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};
const revealLeft = {
  origin: 'bottom',
  distance: '0',
  duration: 1600,
  beforeReveal: (domEl) => {
    domEl.classList.add('revealLeft');
  },
  viewOffset: {
    top: 0,
    right: -256,
    bottom: 0,
    left: -256,
  },
};
const revealCardLeft = {
  origin: 'left',
  distance: '0',
  duration: 1200,
  beforeReveal: (domEl) => {
    domEl.classList.add('revealCardLeft');
  },
};
const revealCardRight = {
  origin: 'left',
  distance: '0',
  duration: 1200,
  beforeReveal: (domEl) => {
    domEl.classList.add('revealCardRight');
  },
};
const cards = document.querySelectorAll('.card--category');
const about = document.querySelector('.pageHead--about');
const loopText = ['love ❤️', 'fun 🍾', 'pride 🎉', 'sweat 💦', 'coffee ☕️', 'friends 🍻', 'travels 🚌', 'DWM 🎓'];

/**
 * [init description]
 * @return {[type]} [description]
 */
export function init() {
  if (cards) {
    listen();
    checkFold();
  }
  if (about) {
    loopAbout();
  }
  srAnimate();
}

function loopAbout() {
  about.querySelector('span').innerHTML = '';

  Type.init(about.querySelector('span'), {
    strings: loopText,
    typeSpeed: 55,
    backSpeed: 30,
    startDelay: 500,
    backDelay: 3000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });
}

/**
 * [srAnimate description]
 * @return {[type]} [description]
 */
function srAnimate() {
  window.sr = scrollReveal(revealCfg);
  window.sr.reveal('p, h2, .doc__article h1, .doc__update, .doc__article li, .doc__article pre', fadeInLeft);
  window.sr.reveal('.pageHead nav', fadeInDownFast);
  window.sr.reveal('.pageHead__link', {
    origin: 'top',
    distance: '12px',
    duration: 400,
    delay: 300,
  }, 50);
  window.sr.reveal(document.querySelectorAll('h3:not(.title)'), fadeInLeft);
  window.sr.reveal('.card--left', revealCardLeft);
  window.sr.reveal('.card--right', revealCardRight);
  window.sr.reveal('.pageHead h1, .pageHead h4, .pageHead .button, .pageHead__form', fadeInUp, 100);
  window.sr.reveal('.article__title h1', fadeInUpRotate);
  window.sr.reveal('._404 h1, ._404 p, ._404 .pageHead__form', fadeInUp);
  window.sr.reveal('figure img', revealLeft, 300);
  window.sr.reveal('figure p', fadeInUp, 100);
  window.sr.reveal('img', revealLeft);
  window.sr.reveal('.footer__logo, .footer__column', footerAnim, 100);
  window.sr.reveal('.footer__bottom .footer__link, .footer__bottom small', footerSmall, 100);
}

/**
 * [checkVisibility description]
 * @return {[type]} [description]
 */
function checkVisibility() {
  for (const card of cards) {
    if (inView.is(card)) {
      //
    }
  }
}

/**
 * [checkFold description]
 * @return {[type]} [description]
 */
function checkFold() {
  for (const card of cards) {
    document.addEventListener('DOMContentLoaded', () => {
      console.log(Viewport.getScrollPosition(card));
    });
    if (Viewport.getScrollPosition(card) < -100) {
      card.classList.add('js-animated');
    }
  }
}

/**
 * Watch Scroll event
 * @param  {string} el HTML node for Progress
 * @return {undefined}
 */
function listen() {
  window.addEventListener('scroll', () => {
    checkVisibility();
  });
}
