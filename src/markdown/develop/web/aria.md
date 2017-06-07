# Aria

It's actually WAI-ARIA, and it stands for Web Accessibility Initiative - Accessible Rich Internet Applications. This is a specification, currently being written by the W3C, which defines additional sets of HTML attributes that provide additional semantics when lacking.

## Roles

Roles are at the top of the specification and can come very handy for extending basic semantics. They are defined by adding a <code class="inline-code">role=\*</code> attribute. Note that [not all roles are applicable to each elements](https://www.w3.org/TR/html-aria/#allowed-aria-roles-states-and-properties), especially when it is implicitly declared: for example, a <code class="inline-code">&lt;aside&gt;</code> tag has an implicit role value of <code class="inline-code">role="complementary"</code> and only allows <code class="inline-code">feed</code>, <code class="inline-code">note</code>, <code class="inline-code">presentation</code>, <code class="inline-code">region</code> or <code class="inline-code">search</code>.

A good use-case example would be our [Color Contrast tool](@@webRoot/tools/contrast), which features generated color palettes.

```html
<div role="button" class="hue">
  <span class="hue__ref">#FFF</span>
  <span class="hue__clipboard">Copied to clipboard</span>
  <div class="hue__btns">
    <button class="hue__btn">Format</button>
    <button class="hue__btn">Copy</button>
  </div>
</div>
```

The <code class="inline-code">&lt;div&gt;</code> container has to be clickable in order to apply the selected hue to the background. And in this case, the use of a <code class="inline-code">&lt;button&gt;</code> element is out of the equation, because they don't allow block-level elements inside them. The only solution is to turn the element into an augmented button, which also works with screen readers, focus states, tab navigation, etc.

Roles can also be used to define landmarks in a web page. Whenever you're using a screen reader, it can summary the layout of a page using landmarks. Try this on VoiceOver by pressing the VoiceOver key + U. This page structure, without specified landmarks would be:

- banner — which stands for <code class="inline-code">&lt;header&gt;</code>;
- navigation — which stands for <code class="inline-code">&lt;nav&gt;</code>;
- main — which is self-explanatory;
- complementary — which stands for <code class="inline-code">&lt;aside&gt;</code>;

Although, we're missing a lot of the structure information. A great way to fix this would be to add corresponding roles to the important landmarks. Let's add to this list our search engine and our important side navigation:

```html
<header>
  <nav>
    <form role="search">
      …
    </form>
  </nav>
</header>
<main>
  <div role="menubar">
    <!-- This role defines our div as a presentation of menu that usually remains visible -->
    <aside>
      <nav aria-label="Breadcrumb">
        <!-- This labels this navigation landmark as a breadcrumb -->
        Home > Category > Content
      </nav>
      <nav aria-label="Table of content">
        <!-- This labels this navigation landmark as a table of content -->
        …
      </nav>
    </aside>
    <article role="article">
      <!-- This roles sets our article, the main content of this page, as a landmark -->
    </article>
  </div>
</main>
```

And now, our structure summarized by a screen reader looks like this:

- banner;
- navigation;
- search;
- main;
- complementary;
- breadcrumb navigation;
- article.

And that allows screen reader users to quickly browse your website "at a glance".

## States & properties

Aria defines a list of multiple properties that can be applied to an HTML element. Here's the current specification, considering you prefix the defined property with <code class="inline-code">aria-</code>.

### atomic

Set to "true", the <code class="inline-code">aria-atomic</code> attribute tells screen readers to read out the entire element contents as one atomic unit, not just the bits that were updated. Usually linked to aria-live.

### controls

It creates a cause and effect relationship between the identified element(s) whose content is controlled by the current element. A good example would be the buttons from image slider controlling the image.

### describedby

This is another labeling technique different than HTML labels or aria-label. You can actually use an element to describe another element, such as an input or an image. This is this exact technique we use in the [Design documentation](@@webRoot/design/colors) for describing example images in a <code class="inline-code">figure</code> element with <code class="inline-code">figcaption</code>.

### disabled

Most browsers just skip past disabled fields, and thus won't be read by screen readers. It's a better UX pattern to notify the screen reader that this particular field exists, but is not available, by setting this property to <code class="inline-code">true</code>.

### dropeffect

Related to drag-and-drop, this property indicates what functions can be performed when the dragged object is released on the drop target. This property only accepts a defined list of tokens: <code class="inline-code">copy</code>, <code class="inline-code">move</code>, <code class="inline-code">link</code>, <code class="inline-code">execute</code>, <code class="inline-code">popup</code>.

### flowto

It allows a screen reader to be given a different reading order by giving it the next element which has to be read.

### grabbed

Also related to drag-and-drop, this state indicates that the current element is in the state of a drag operation.

### haspopup

This property indicates that the current element has a popup menu or an underlying menu. A simple example is a dropdown list navigation.

```html
<ul>
  <li>Menu element 1</li>
  <li aria-haspopup="true">
    Menu element w/ dropdown
    <ul>
      <li>Sub-element 1</li>
      <li>Sub-element 2</li>
      <li>Sub-element 3</li>
    </ul>
  </li>
  <li>Menu element 3</li>
</ul>
```

### hidden

Once this property is set to true, the screen reader will automatically skip the element and not read it. This can be useful for inline images or SVGs whose purpose is only decoration. For people using inline icon fonts, it may also be useful to use the hidden property on the element containing the character.

### invalid

The invalid property allows to be a bit more specific as to why a field is invalid. It uses a list of the following tokens as valid values: <code class="inline-code">grammar</code>, <code class="inline-code">spelling</code>, <code class="inline-code">false</code> and <code class="inline-code">true</code>.

### label

Interface elements can sometimes only be graphic, and not have any content. This is when aria-label comes in the play. We used this technique on a few buttons containing no text.

```html
<button class="js-renew" aria-label="Generate new accessible colors"></button>
```

### labelledby

It is almost exactly the same as a the label property. The only difference residing in the fact that if the labelling text is visible on screen, it should be defined by this property.

```html
<div role="dialog" aria-labelledby="diagTitle">
  <h2 id="diagTitle">An error occured</h2>
  …
</div>
```

### live

Many websites feature infinite scrolling techniques, such as Twitter or Facebook. Although, screen readers cannot be aware of dynamically loaded content, whether it is through network request or DOM manipulation. Setting this property to <code class="inline-code">true</code> to the container holding your generated content will allow the screen reader to read the new content.

### owns

Correct semantics always imply a parent/child relationship. But in some cases, it might not be possible to create such a DOM relationship. Here's a great and simple example:

```html
<ul>
  <li aria-owns="fruits">Fruit</li>
  <li aria-owns="veggies">Vegetables</li>
</ul>

<ul id="fruits">
  <li>Apples</li>
  <li>Bananas</li>
  <li>Cherries</li>
</ul>

<ul id="veggies">
  <li>Aubergine</li>
  <li>Brussels sprouts</li>
  <li>Carrots</li>
</ul>
```

### relevant

Tied to aria-live, this property helps telling screen readers what happened in a live-region change. It accepts a list of tokens which can be combined: <code class="inline-code">additions</code>, <code class="inline-code">removals</code>, <code class="inline-code">text</code> and <code class="inline-code">all</code>.

### Other properties

Above were the main properties you may use on any HTML element. However, more specific properties for specific elements exist as well. They are all defined in [Section 6.6 of the WAI - ARIA Specification](https://www.w3.org/TR/wai-aria/states_and_properties#state_prop_def).
