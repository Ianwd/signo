import debounce from 'lodash/debounce';
import request from 'superagent';

const container = document.querySelector('.js-search');
// const input = container.querySelector('input');
const input = document.querySelector('.js-search > input');
const clear = document.querySelector('.js-searchCancel');

/**
 * Initialize search functions
 * @return {undefined}
 */
export function init() {
  const rateLimit = 200;

  if (container) {
    container.addEventListener('click', () => {
      input.focus();
      if (input.value.length > 0) {
        showClear();
        showResults();
      }
    });
    document.addEventListener('click', (ev) => {
      const clickInside = container.contains(ev.target);

      if (!clickInside && !document.querySelector('.search__result').classList.contains('js-searchHidden')) {
        hideResults();
        hideClear();
      }
    });
  }
  if (clear) {
    clear.addEventListener('click', () => {
      clearInput();
      hideResults();
      hideClear();
    });
  }
  if (input) {
    input.addEventListener('input',
      debounce(searchRequest, rateLimit)
    );
    input.addEventListener('keydown', (ev) => {
      if (ev.keyCode === 27) {
        input.blur();
        clearInput();
        hideResults();
        hideClear();
        ev.preventDefault();
      }
    });
  }
}

/**
 * Clear input value
 * @return {undefined}
 */
function clearInput() {
  input.value = null;
}

/**
 * Display 'clear' button of input
 * @return {undefined}
 */
function showClear() {
  if (input.value.length > 0) {
    clear.classList.add('search__cancelButton--visible');
  } else if (clear.classList.contains('search__cancelButton--visible')) {
    hideResults();
    hideClear();
  }
}

/**
 * Hide 'clear' button of input
 * @return {undefined}
 */
function hideClear() {
  clear.classList.remove('search__cancelButton--visible');
}

/**
 * Make request to JSON file
 * and handle success or error
 * @return {undefined}
 */
function searchRequest() {
  if (input.value.length > 0) {
    request.
      get('/search/index.json').
      accept('application/json').
      retry().
      end((err, res) => {
        if (err || !res.ok) {
          searchFail(err);
        } else {
          searchResults(res);
        }
      });
  }
}

/**
 * Parse and display search results
 * @param  {string} response  AJAX response
 * @return {undefined}
 */
function searchResults(response) {
  console.log(response.body);
  showResults();
}

/**
 * Handle AJAX error
 * @param  {string} error  Error response
 * @return {undefined}
 */
function searchFail(error) {
  console.log(error);
}

/**
 * Hide search results
 * @return {undefined}
 */
function hideResults() {
  document.querySelector('.search__result').classList.add('js-searchHidden');
}

/**
 * Displays search results
 * @return {undefined}
 */
function showResults() {
  document.querySelector('.search__result').classList.remove('js-searchHidden');
}
