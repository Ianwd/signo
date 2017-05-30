const html = document.querySelector('html');
const body = document.body;

/**
 * [init description]
 * @return {[type]} [description]
 */
export function init() {
  html.classList.remove('no-js');
  html.classList.add('js');
}
