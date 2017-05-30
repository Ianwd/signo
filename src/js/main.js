/**
 * Main JS entry file
 */

import * as DomHelper from './dom-helper';
import * as Analytics from './vendor/ga';
import * as Header from './header';
import * as Progress from './progress';
import * as Search from './search';
import * as Animator from './animator';
import ScrollTo from 'storm-scroll-to';

DomHelper.init();

if (document.querySelector('.js-toc')) {
  ScrollTo.init('.js-toc', {
    easing: 'easeInOutCubic',
    speed: 800,
    offset: 96,
  });
}

Search.init();
Header.headroom.init();
Analytics.init();
Progress.init();
Animator.init();
