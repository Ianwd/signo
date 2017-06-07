# Semantic

## The right tags

There is no golden rule for using elements. But navigation is navigation, lists are lists, links are links, buttons are buttons, etc. Just know your tags and don't reinvent the wheel.

### Title

Each page should have its own <code class="inline-code">&lt;title&gt;</code>, usually starting from the most specific to the most general, like:

```html
<title>Semantic – Web - Develop | signo</title>
```

### Language

If you specify the natural language of your page, the screen reader software will be able to use the correct pronunciation rules.

```html
<html lang="en">
```

### Images

It's acquired to us that images look like how we see them. Which is as logic as it can get. But some people with certain impairments cannot see clearly, and rely on screen readers to read them what's in the image. And unless you are Facebook and own machine learning algorithms which can automatically describe the content of an image — that was long to read sorry, disabled users rely on you providing adequate description of an image. Think of it as declarative information.

```html
<!-- This is read by screen readers as "Image" -->
<img src="/assets/img/dumb.gif">

<!-- This is not read by screen readers -->
<img src="/assets/img/good.jpg" aria-hidden="true">

<!-- This is read by screen readers using the alt content -->
<img src="/assets/img/excellent.svg" alt="Screenshot of VoiceOver iterating through DOM elements in Safari">
```

## Structure

When integrating a design, we recommend starting by writing pure HTML without any styling. This way, you can see the natural flowing of your content, which will not change after styling anyway — even if you use <code class="inline-code">flex</code> with <code class="inline-code">order</code>.

Keep in mind that screen readers follow the DOM order, and ignore styling, except for <code class="inline-code">content</code>, which is readable.

It is important to use content hierarchy to format your content. You should use the correct sectioning with headings, just like this:

```html
<header>
  <h1 class="logo">signo</h1>
  <nav>...</nav>
</header>
<main role="main">
  <h1>Heading</h1>
  <p>A random paragraph under heading 1</p>

  <section>
    <h2>A section title</h2>
    <p>Have a look at this</p>
  </section>

  <article>
    <h2>How to structure HTML</h2>
    <p>...</p>
    <aside>
      Complementary information
    </aside>
  </article>
</main>
<footer>
  <ul>
    <li>Page 1</li>
    …
  </ul>
</footer>
```
