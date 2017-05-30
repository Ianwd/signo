import * as Colors from './utils/color.const';
import tinycolor from 'tinycolor2';
import debounce from 'lodash/debounce';

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
const startBtn = document.querySelector('.js-start');
const switchBtn = document.querySelectorAll('.js-switch');
const generateBtn = document.querySelector('.js-generate');
const foregroundInputLanding = document.querySelector('.js-foregroundInputLanding');
const backgroundInputLanding = document.querySelector('.js-backgroundInputLanding');
const foregroundInput = document.querySelector('.js-foregroundInput');
const backgroundInput = document.querySelector('.js-backgroundInput');
const fieldset = document.querySelectorAll('.js-fieldset');
const typography = document.querySelector('.typography');
const hues = document.querySelector('.js-hues');
const palette = document.querySelector('.js-palette');
const hue = document.querySelectorAll('.js-hue');
const mainHue = document.querySelector('.js-mainHue');
const bg = document.querySelector('.js-bgHue');
const ratio = document.querySelector('.js-currentContrast');
const step1 = document.querySelector('.js-firstStep');
const step2 = document.querySelector('.js-secondStep');
const step3 = document.querySelector('.js-thirdStep');
const validLarge = document.querySelector('.js-validationLargeText');
const validSmall = document.querySelector('.js-validationSmallText');
const renew = document.querySelector('.js-renew');

if (JSON.parse(sessionStorage.getItem('io.signo.contrastVisited')) === true) {
  skipIntro();
}

startBtn.addEventListener('click', () => {
  start();
});
Array.from(switchBtn).forEach((el) => {
  el.addEventListener('click', () => {
    switchColors();
  });
});
foregroundInputLanding.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    const fg = foregroundInputLanding.value;
    const bg = backgroundInputLanding.value;

    foregroundInput.value = fg;
    backgroundInput.value = bg;

    proceedStepThree();
    validateInput(fg, bg);
    sessionStorage.setItem('io.signo.contrastVisited', 'true');
  }
});
backgroundInputLanding.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    const fg = foregroundInputLanding.value;
    const bg = backgroundInputLanding.value;

    foregroundInput.value = fg;
    backgroundInput.value = bg;

    proceedStepThree();
    validateInput(fg, bg);
    sessionStorage.setItem('io.signo.contrastVisited', 'true');
  }
});
generateBtn.addEventListener('click', () => {
  const fg = foregroundInputLanding.value;
  const bg = backgroundInputLanding.value;

  foregroundInput.value = fg;
  backgroundInput.value = bg;

  proceedStepThree();
  validateInput(fg, bg);
  sessionStorage.setItem('io.signo.contrastVisited', 'true');
});
Array.from(fieldset).forEach((el) => {
  el.addEventListener('click', () => {
    el.querySelector('input').focus();
  });
});
foregroundInput.addEventListener('input',
  debounce(() => {
    validateInput(
      foregroundInput.value,
      backgroundInput.value
    );
  }, 200)
);
backgroundInput.addEventListener('input',
  debounce(() => {
    validateInput(
      foregroundInput.value,
      backgroundInput.value
    );
  }, 200)
);
Array.from(hue).forEach((el) => {
  el.addEventListener('click', () => {
    applyColor(el.style.backgroundColor, el.dataset.ratio);
  });
});
mainHue.addEventListener('click', () => {
  applyColor(mainHue.style.backgroundColor, mainHue.dataset.ratio);
});
renew.addEventListener('click', () => {
  renew.classList.add('rotate');
  generatePalette();
  wait(800).then(() => renew.classList.remove('rotate'));
});

/**
 * [start description]
 * @return {[type]} [description]
 */
function start() {
  step1.classList.add('terminated');
  removeStep(step1, 800);
  secondStep();
}

function removeStep(el, time = 1000) {
  window.setTimeout(() => {
    el.style.display = 'none';
  }, time);
}

function secondStep() {
  step2.removeAttribute('style');
  wait(800).then(() => step2.querySelector('h1').classList.add('fadeInFromTop'));
  wait(900).then(() => step2.querySelectorAll('.inputGroup')[0].classList.add('fadeInFromTop'));
  wait(1000).then(() => step2.querySelectorAll('.inputGroup')[1].classList.add('fadeInFromTop'));
  wait(1100).then(() => step2.querySelector('.js-switch').classList.add('wiggle'));
  wait(1200).then(() => step2.querySelector('.generate').classList.add('fadeInFromTop'));
  wait(1400).then(() => step2.querySelector('.tip').classList.add('fadeInFromTop'));
}

function thirdStep() {
  step3.querySelector('.navigation').classList.add('fadeInFromTop');
  wait(400).then(() => hues.classList.remove('huesDown'));
  wait(800).then(() => step3.querySelector('.typography__large').classList.add('slideFromRight'));
  wait(1000).then(() => step3.querySelector('.typography__small').classList.add('slideFromRight'));
}

function proceedStepThree() {
  step2.classList.add('terminated');
  removeStep(step2, 800);
  step2.querySelectorAll('.inputGroup')[0].classList.add('fadeOutToTop');
  wait(100).then(() => step2.querySelectorAll('.inputGroup')[1].classList.add('fadeOutToTop'));
  wait(800).then(() => step3.removeAttribute('style'));
  wait(800).then(() => thirdStep());
}

function switchColors() {
  const foregroundLanding = document.querySelector('.js-foregroundInputLanding');
  const backgroundLanding = document.querySelector('.js-backgroundInputLanding');
  const foreground = document.querySelector('.js-foregroundInput');
  const background = document.querySelector('.js-backgroundInput');

  foregroundLanding.classList.add('bounceRight');
  backgroundLanding.classList.add('bounceLeft');

  fieldset[0].classList.add('bounceRight');
  fieldset[1].classList.add('bounceLeft');

  window.setTimeout(() => {
    const foreVal = foregroundLanding.value;
    const backVal = backgroundLanding.value;

    foregroundLanding.value = backVal;
    foreground.value = backVal;
    backgroundLanding.value = foreVal;
    background.value = foreVal;

    processInput(backVal, foreVal);
  }, 400);
  window.setTimeout(() => {
    foregroundLanding.classList.remove('bounceRight');
    backgroundLanding.classList.remove('bounceLeft');

    fieldset[0].classList.remove('bounceRight');
    fieldset[1].classList.remove('bounceLeft');
  }, 800);
}

function validateInput(foreground, background) {
  if (tinycolor(foreground).isValid()) {
    hideError(1);
    if (tinycolor(background).isValid()) {
      processInput(foreground, background);
      hideError(2);
    } else {
      showError(2);
      console.log('background is invalid');
    }
  } else {
    showError(1);
    console.log('foreground is invalid');
  }
}

function showError(type) {
  if (type === 1) {
    // Handle color input error for foreground
    const el = document.querySelector('.js-validationError');

    fieldset[0].classList.add('fieldError');
    foregroundInput.setAttribute('aria-invalid', 'true');
    el.classList.add('displayError');
  } else if (type === 2) {
    // Handle color input error for background
    const el = document.querySelector('.js-validationError');

    fieldset[1].classList.add('fieldError');
    backgroundInput.setAttribute('aria-invalid', 'true');
    el.classList.add('displayError');
  } else if (type === 3) {
    // Handle contrast error
    document.querySelector('.js-contrastMsg').classList.add('displayError');
    renew.classList.add('displayError');
  }
}

function hideError(type) {
  if (type === 1) {
    const el = document.querySelector('.js-validationError');

    fieldset[0].classList.remove('fieldError');
    foregroundInput.removeAttribute('aria-invalid');
    el.classList.remove('displayError');
  } else if (type === 2) {
    const el = document.querySelector('.js-validationError');

    fieldset[1].classList.remove('fieldError');
    backgroundInput.removeAttribute('aria-invalid');
    el.classList.remove('displayError');
  } else if (type === 3) {
    // Remove contrast error
    document.querySelector('.js-contrastMsg').classList.remove('displayError');
    renew.classList.remove('displayError');
  }
}

function showAlternatives() {
  palette.classList.add('paletteUp');
}

function hideAlternatives() {
  palette.classList.remove('paletteUp');
}

function contrast(foreground, background) {
  const L1 = tinycolor(foreground).getLuminance();
  const L2 = tinycolor(background).getLuminance();
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

  return ratio;
}

function validateWCAG(ratio) {
  const AA = "WCAG AA";
  const AAA = "WCAG AAA";

  validLarge.classList.remove('validBadge--valid', 'validBadge--invalid');
  validSmall.classList.remove('validBadge--valid', 'validBadge--invalid');
  // Below 3 is a total failure.
  // Between 3 and 4.5 => WCAG AA PASS for large text.
  // Between 4.5 and 7 => WCAG AA PASS for small text
  // & WCAG AAA PASS for large text.
  // From 7 and above => WCAG AAA PASS for small text.
  if (ratio < 3) {
    validLarge.classList.add('validBadge--invalid');
    validLarge.innerHTML = AA;
    validSmall.classList.add('validBadge--invalid');
    validSmall.innerHTML = AA;
    showError(3);
  } else if (ratio > 3 && ratio < 4.5) {
    validLarge.classList.add('validBadge--valid');
    validLarge.innerHTML = AA;
    validSmall.classList.add('validBadge--invalid');
    validSmall.innerHTML = AA;
    showError(3);
  } else if (ratio > 4.5 && ratio < 7) {
    validLarge.classList.add('validBadge--valid');
    validLarge.innerHTML = AAA;
    validSmall.classList.add('validBadge--valid');
    validSmall.innerHTML = AA;
    showError(3);
  } else if (ratio > 7) {
    validLarge.classList.add('validBadge--valid');
    validLarge.innerHTML = AAA;
    validSmall.classList.add('validBadge--valid');
    validSmall.innerHTML = AAA;
    hideError(3);
  }
}

function processInput(foreground, background) {
  let ratioVal = contrast(foreground, background);

  validateWCAG(ratioVal);
  typography.style.color = tinycolor(foreground).toRgbString();
  bg.style.backgroundColor = tinycolor(background).toRgbString();
  mainHue.style.backgroundColor = tinycolor(background).toRgbString();
  mainHue.dataset.ratio = ratioVal;
  if (ratioVal > Math.floor(ratioVal)) {
    ratioVal = (Math.round((ratioVal * 1000) / 10) / 100).toFixed(2);
  }
  ratio.innerHTML = ratioVal;
  storeLocal(foreground, background);
  if (ratioVal < 7) {
    generatePalette();
    showAlternatives();
  } else if (document.querySelector('.js-palette').classList.contains('paletteUp')) {
    hideAlternatives();
  }
}

function storeLocal(foreground, background) {
  const object = {
    'foreground': foreground,
    'background': background,
  };

  localStorage.setItem('io.signo.contrast', JSON.stringify(object));
}

function skipIntro() {
  const savedColors = JSON.parse(localStorage.getItem('io.signo.contrast'));

  step1.style.display = 'none';
  step2.style.display = 'none';
  step3.removeAttribute('style');
  thirdStep();
  foregroundInputLanding.value = savedColors.foreground;
  backgroundInputLanding.value = savedColors.background;
  foregroundInput.value = savedColors.foreground;
  backgroundInput.value = savedColors.background;
  processInput(savedColors.foreground, savedColors.background);
}

function generatePalette() {
  const baseColor = backgroundInput.value;
  const colors = [];

  for (let i = 0; i < 4; i++) {
    colors.push(generateColor(baseColor));
  }

  for (let i = 0; i < hue.length; i++) {
    hue[i].style.backgroundColor = colors[i].color;
    hue[i].dataset.ratio = colors[i].ratio;
  }
}

function generateColor(color) {
  const originColor = tinycolor(color).toRgb();
  const generated = tinycolor.random().toRgb();
  // This is another way of generating a color while
  // still using RGB and not RYB. Spin the color wheel
  // according to golden angle.
  // const generated = tinycolor(color).spin(137.5).toRgb();
  const mix = {
    r: (generated.r + originColor.r) / 2,
    g: (generated.g + originColor.g) / 2,
    b: (generated.b + originColor.b) / 2,
  };
  const foreground = foregroundInput.value;
  const ratio = contrast(foreground, tinycolor(mix).toRgbString());

  if (ratio < 7) {
    return generateColor(tinycolor(originColor).toRgbString());
  } else {
    return {
      color: tinycolor(mix).toHslString(),
      ratio: ratio,
    };
  }
}

function applyColor(color, ratioVal) {
  validateWCAG(ratioVal);
  bg.style.backgroundColor = color;

  if (ratioVal > Math.floor(ratioVal)) {
    ratioVal = (Math.round((ratioVal * 1000) / 10) / 100).toFixed(2);
  }

  ratio.innerHTML = ratioVal;
}
