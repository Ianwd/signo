# Navigation

## Markup

What makes a menu accessible is basically keeping it to semantics and elements basics. Navigations should always be tucked in a <code class="inline-code">&lt;nav&gt;</code> tag, and nested in lists, just like this:

```html
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/design">Design</a></li>
  <li><a href="/develop">Develop</a></li>
</ul>
```

There you go, we just did the most basic and fully accessible navigation. Keep in mind that the simplest the markup, the more accessible it is. The last required criteria is that your navigation should not rely on JavaScript, simply because some users disable it.

For mobile toggles, like hamburger menus <code class="inline-code">☰</code>, it's recommended to use a <code class="inline-code">&lt;button&gt;</code> element.

```html
<button class="nav__toggle" type="button" aria-label="Toggle Navigation" aria-controls="navigation">
  <span></span>
</button>
<div id="navigation" class="nav__mobile">
  <ul>
    <li><a href="/design">Design</a></li>
    <li><a href="/develop">Develop</a></li>
    <li><a href="/tools">Tools</a></li>
    <li><a href="/learn">Learn</a></li>
  </ul>
</div>
```

```css
.nav__toggle {
  outline: 0;
  border: 0;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  padding: 0;
  width: 48px;
  height: 48px;
  position: relative;
  right: -12px;
}

.nav__toggle span {
  width: 22px;
  height: 2px;
  background-color: black;
  border-radius: 2px;
  display: block;
  margin: 0 auto;
  position: relative;
}

.nav__toggle span::before,
.nav__toggle span::after {
  content: "";
  width: 14px;
  height: 2px;
  background-color: black;
  border-radius: 2px;
  display: block;
  margin: 0 auto;
  position: absolute;
  top: -6px;
}

.nav__toggle span::after {
  top: auto;
  bottom: -6px;
  right: 0;
}
```

As you see, our <code class="inline-code">&lt;button&gt;</code> only contains a span used for creating a hamburger icon. You can also notice that our toggle features a label, replacing the empty button content for screen readers, as well as an <code class="inline-code">aria-controls</code> property indicating that this element controls the navigation container.

## Links

At all costs, avoid text links which means nothing when being read alone. The worst scenario is basically:

```html
<a href="#">More</a>
```

It doesn't make any sense for screen reader users. And if this choice was made for design decisions, we can only recommend you to try labeling your link with Aria:

```html
<a href="#" aria-label="Read more about this news">More</a>
```

### Skip links

We recommend using this navigation pattern to allow people to jump, or "skip", over page elements. It's one of the most basic and useful tweaks for increasing the usability of your page for screen-readers and other assistive technologies.

Whenever a person using a screen reader loads a web page, the default focus position is the first element in the <code class="inline-code">&lt;body&gt;</code> tag. If you do not set a skip link, users will have to cycle through navigation and any other elements coming before the main content. These skip tweaks do not need to be visible, so they can be hidden for regular users. Here's how we do on signo:

```html
<a href="#maincontent" class="sr">Skip to main content</a>
…
<main id="maincontent"></main>
```

```css
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

This <code class="inline-code">.sr</code> class can be used to hide any other elements which should only be visible to screen readers.
