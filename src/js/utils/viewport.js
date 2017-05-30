/**
 * Gets visible position of given element
 * @return {integer} Value in percent
 */
export function getScrollPosition(el) {
  const rect = el.getBoundingClientRect();
  const body = document.body;
  const elTop = rect.top + body.scrollTop;
  const windowTop = window.pageYOffset;
  const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const position = (elTop - windowTop) * 100 / windowHeight;

  return position;
}
