/**
 * Main JS entry file
 */

import * as DomHelper from './dom-helper';
import * as Analytics from './vendor/ga';
import * as Header from './header';
import * as Progress from './progress';
import * as Search from './search';
import * as Animator from './animator';
import * as Nav from './nav';
// import ScrollTo from 'storm-scroll-to';
import anchorScroll from 'anchor-scroll';

DomHelper.init();

if (document.querySelector('.js-scrollTo')) {
  // ScrollTo.init('.js-scrollTo', {
  //   easing: 'easeInOutCubic',
  //   speed: 800,
  //   offset: 96,
  //   pushState: false,
  // });
  anchorScroll.init({
    updateUrl: false,
    offset: -96,
    ease: 'in-out-quad',
    duration: 1200,
    selector: '.js-scrollTo',
  });
}

Search.init();
Header.headroom.init();
Analytics.init();
Progress.init();
Animator.init();
Nav.init();
