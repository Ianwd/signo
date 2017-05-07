import inView from 'in-view';

const links = document.querySelectorAll('.js-toc');
const inViewOptions = {
  offset: {
    top: 300,
    bottom: 300,
  },
};

/**
 * Initialize progress bar
 * @return {undefined}
 */
export function init() {
  const el = document.querySelector('.js-progress');

  if (el) {
    document.addEventListener('DOMContentLoaded', () => {
      el.style.transform = 'scaleY(0)';
      update(el);
    });
  }
}

/**
 * Fired when h2 enters viewport
 * @param  {string} el HTML node from inView
 * @return {undefined}
 */
function viewDown(el) {
  const current = document.querySelector('.doc__tocLink--active');

  current.classList.remove('.doc__tocLink--active');
  for (const link of links) {
    if (link.attributes.href.nodeValue.split('#')[1] === el.id) {
      link.classList.add('doc__tocLink--active');
    } else {
      link.classList.remove('doc__tocLink--active');
    }
  }
}

/**
 * Fired when h2 exits viewport,
 * continues only if scrolling up.
 * @param  {string} el HTML node from inView
 * @return {undefined}
 */
function viewUp(el) {
  if (el.nextElementSibling) {
    if (!inView.is(el.nextElementSibling)) {
      for (const link of links) {
        if (link.attributes.href.nodeValue.split('#')[1] === el.id && link.previousElementSibling) {
          link.previousElementSibling.classList.add('doc__tocLink--active');
          link.classList.remove('doc__tocLink--active');
        }
      }
    }
  }
}

/**
 * Update progress bar
 * @param  {string} el HTML node
 * @return {undefined}
 */
function update(el) {
  const titles = document.querySelectorAll('.doc__article h2');

  window.addEventListener('scroll', () => {
    const scrollValue = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const body = document.body;
    const html = document.documentElement;
    const deltaValue = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const currentValue = window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollValue / (deltaValue - currentValue)));

    el.style.transform = `scaleY(${progress})`;

    if (titles) {
      inView('.doc__article h2', inViewOptions).
        on('enter', viewDown).
        on('exit', viewUp);
    }
  });
}
