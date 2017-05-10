import inView from 'in-view';
import * as Viewport from './utils/viewport';

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
      watchScroll(el);
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
function updateProgress(el) {
  const scrollValue = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  const body = document.body;
  const html = document.documentElement;
  const deltaValue = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const currentValue = window.innerHeight;
  const progress = Math.min(1, Math.max(0, scrollValue / (deltaValue - currentValue)));

  el.style.transform = `scaleY(${progress})`;
}

/**
 * Watch for titles in viewport
 * @return {undefined}
 */
function watchTitles() {
  const titles = document.querySelectorAll('.doc__article h2');

  if (titles) {
    inView('.doc__article h2', inViewOptions).
      on('enter', viewDown).
      on('exit', viewUp);
  }
}

/**
 * Fade out sidebar content when
 * footer comes in
 * @return {undefined}
 */
function columnFade() {
  if (inView.is(document.querySelector('.doc__readmore'))) {
    const visible = Viewport.getScrollPosition(document.querySelector('.doc__readmore'));

    if (visible <= 85) {
      const column = document.querySelector('.doc__columnContent');
      // Formula:
      //  new_value = (old_value - old_bottom) / (old_top - old_bottom) * (new_top - new_bottom) + new_bottom;
      const map = ((visible / 100) - 0) / (0.85 - 0) * (1 - 0) + 0;
      console.log(map);

      column.style.opacity = map.toFixed(2);
    }
  }
}

/**
 * Watch Scroll event
 * @param  {string} el HTML node for Progress
 * @return {undefined}
 */
function watchScroll(el) {
  for (const ev of ['scroll', 'resize']) {
    window.addEventListener(ev, () => {
      updateProgress(el);
      watchTitles();
      columnFade();
    });
  }
}
