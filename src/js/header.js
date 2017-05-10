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
  onNotTop: function() {
    notTop()
  },
  onTop: function() {
    onTop()
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
    bread.classList.add('doc__breadcrumb--top');
  }
}

/**
 * [notTop description]
 * @return {[type]} [description]
 */
export function notTop() {
  if (header.classList.contains('header--light')) {
    header.classList.remove('header--light');
    header.classList.add('js-header-light');
  }
}

/**
 * [onTop description]
 * @return {[type]} [description]
 */
export function onTop() {
  if (header.classList.contains('js-header-light')) {
    header.classList.remove('js-header-light');
    header.classList.add('header--light');
  }
}
