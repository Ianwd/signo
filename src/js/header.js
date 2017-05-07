import Headroom from 'headroom.js';
const header = document.querySelector('.header');
const bread = document.querySelector('.doc__breadcrumb');

export const headroom = new Headroom(header, {
  tolerance: {
    up: 10,
    down: 10,
  },
  offset: 64,
  classes: {
    pinned: 'js-header--pinned',
    unpinned: 'js-header--unpinned',
    top: 'js-header--top',
    notTop: 'js-header--not-top',
    bottom: 'js-header--bottom',
    notBottom: 'js-header--not-bottom',
    initial: 'js-header',
  },
  onPin: function() {
    onPin()
  },
  onUnpin: function() {
    onUnPin()
  },
});

/**
 * When onPin is fired by Headroom
 * @return {undefined}
 */
export function onPin() {
  if (bread) {
    bread.classList.remove('doc__breadcrumb--top');
  }
}

/**
 * When onUnPin is fired by Headroom
 * @return {undefined}
 */
export function onUnPin() {
  if (bread) {
    bread.className += ' doc__breadcrumb--top';
  }
}
