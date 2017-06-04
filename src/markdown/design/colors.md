# Colors

## Contrast ratio

Color and contrast are key elements for users to correctly see and read your content. Making sure your color palette contrast is sufficient is the first step to make sure interactive elements are visible and your content is usable. This will also be profitable to users using your project in a very bright environment.

Keep in mind this section is currently under writing. Visual examples are missing as well.

<div class="exemple">
  <figure>
    <div>
      <img aria-describedby="figure-1" src="@@webRoot/assets/img/doc-color-contrast-2.png" srcset="@@webRoot/assets/img/doc-color-contrast-2.png 1x, @@webRoot/assets/img/doc-color-contrast-2@2x.png 2x">
    </div>
    <figcaption id="figure-1">
      <p>Do</p>
      <p>These lines of text follow the color contrast ratio recommendations and are legible against their background colors.</p>
    </figcaption>
  </figure>
  <figure>
    <div>
      <img aria-describedby="figure-2" src="@@webRoot/assets/img/doc-color-contrast-1.png" srcset="@@webRoot/assets/img/doc-color-contrast-1.png 1x, @@webRoot/assets/img/doc-color-contrast-1@2x.png 2x">
    </div>
    <figcaption id="figure-2">
      <p>Don't</p>
      <p>These lines of text follow the color contrast ratio recommendations and are legible against their background colors.</p>
    </figcaption>
  </figure>
</div>


### W3C recommendations

Color contrast is determined on a 21 ratio scale by the intensity of light emitted by a color and its background. This contrast is usually written as 1:1, up to 21:1. The higher the difference between the two numbers, the higher the contrast is. The World Wide Web Consortium recommends a minimum of:

- 4.5:1 ratio for small text against its background;
- at least a 3:1 ratio for larger text (14pt bold or 18pt regular).

## Color blindness

There are multiple types of color blindness but it all comes down to not seeing color clearly, getting colors mixed up, or not being able to differentiate certain colors.

In a group of eight men and eight women on your team, there’s a 50% chance that at least one teammate is color-blind. While there are several different types of color blindness, all individuals who are color-blind rely on cues like shapes or semantics in situations where they could otherwise rely on clearly differentiated colors, like when waiting for a traffic light to turn "green".

You should not rely solely on colors to give information, for buttons or even color selection. Labeling elements is a key element to accessibility.

## Sensory information

This section only contains different code tags demonstration.

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```html
<article>Some code</article>
```

```scss
$variable: "string";
body {
  content: $variable;
}
```

- 1
- 2
- 3
