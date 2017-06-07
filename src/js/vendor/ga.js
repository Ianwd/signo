/**
 * Initialize Google Analytics with tracking ID
 * @return {undefined} Undefined if not initialized
 */
export function init() {
  if (window.ga !== undefined) {
    return;
  }
  const gaTrackingId = 'UA-67614755-2';

  /* eslint-disable */
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  /* eslint-enable */

  /* Temporary disable for dev*/
  window.ga('create', gaTrackingId, 'auto');
  window.ga('send', 'pageview');
}

/**
 * Send a custom Analytics event
 * @param  {text} category  Typically the object interacted with (e.g. 'Video')
 * @param  {text} action    The type of interaction (e.g. 'play')
 * @param  {text=} label    Optional categorizing events (e.g. 'Fall Campaign')
 * @param  {integer} [value=1] Numeric value associated with the event (e.g. 42)
 * @return {undefined}
 */
export function sendCustomEvent(category, action, label, value = 1) {
  window.ga('send', {
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value,
  });
}
