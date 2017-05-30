import inView from 'in-view';
import * as Viewport from './utils/viewport';
import debounce from 'lodash/debounce';

const cards = document.querySelectorAll('.card--category');

inView.offset({
  top: 0,
  bottom: 200,
});

/**
 * [init description]
 * @return {[type]} [description]
 */
export function init() {
  if (cards) {
    listen();
    checkFold();
  }
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
