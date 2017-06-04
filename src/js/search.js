import debounce from 'lodash/debounce';
import request from 'superagent';

const form = document.querySelector('.js-search');
const container = document.querySelector('.js-container');
const input = document.querySelector('.js-input');
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
      container.classList.add('active');
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
        container.classList.remove('active');
      } else if (!clickInside) {
        container.classList.remove('active');
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
        container.classList.remove('active');
        ev.preventDefault();
      }
      if (ev.keyCode === 13) {
        ev.preventDefault();

        return false;
      }
    });
    form.addEventListener('keydown', (ev) => {
      const items = document.querySelectorAll('.search__item');

      if (items.length > 0 && input.value.length > 2) {
        if (ev.keyCode === 40) {
          focusList(ev, 'down');
          ev.preventDefault();
        }
        if (ev.keyCode === 38) {
          focusList(ev, 'up');
          ev.preventDefault();
        }
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
  showClear();
  if (input.value.length > 2) {
    request.
      get(`/search/${input.value}`).
      accept('application/json').
      retry().
      end((err, res) => {
        if (err || !res.ok) {
          searchFail(err);
        } else {
          searchResults(res);
        }
      });
  } else {
    hideResults();
  }
}

/**
 * Parse and display search results
 * @param  {string} response  AJAX response
 * @return {undefined}
 */
function searchResults(response) {
  const result = response.body;
  const list = document.querySelector('.search__result');

  list.innerHTML = '';

  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      const source = result[i]._source;
      const markup = `
      <li class="search__item search__item--${source.category}">
        <a href="${source.link}" aria-label="Learn more about ${source.title} in the ${source.category} category">
          ${source.title}
          <span class="search__tag">${source.category}</span>
        </a>
      </li>`;

      list.innerHTML += markup;
    }
  } else {
    const markup = `
    <li class="search__item">
      <a>
        We tried hard, but couldn't find anything 😞
      </a>
    </li>`;

    list.innerHTML = markup;
  }

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

function focusList(ev, direction) {
  if (ev.target.className.includes('js-input')) {
    if (direction === 'down') {
      const rsltList = document.querySelector('.search__result');

      rsltList.querySelector('a').focus();
    } else {
      const results = document.querySelectorAll('.search__item');
      const last = results[results.length - 1];

      last.querySelector('a').focus();
    }
  } else if (ev.target.localName === 'a') {
    const parent = ev.target.parentNode;

    if (direction === 'down') {
      const next = parent.nextElementSibling;

      if (next === null) {
        input.focus();
      } else {
        next.querySelector('a').focus();
      }
    } else {
      const prev = parent.previousElementSibling;

      if (prev === null) {
        input.focus();
      } else {
        prev.querySelector('a').focus();
      }
    }
  }
}
