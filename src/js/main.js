/**
 * Main JS entry file
 */

import * as Analytics from './vendor/ga';
import * as Header from './header';
import * as Progress from './progress';
import ScrollTo from 'storm-scroll-to';

const ToCLink = document.querySelector('.js-toc');

if (ToCLink) {
  ScrollTo.init('.js-toc', {
    easing: 'easeInOutCubic',
    speed: 800,
    offset: 96,
  });
}

Header.headroom.init();
Analytics.init();
Progress.init();
