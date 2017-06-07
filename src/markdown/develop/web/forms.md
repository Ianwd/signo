# Forms

## Logic

It may seem like an idiotic tip, but it's crucial, and not only for accessibility. We recommend first writing down all the elements you need to require from your user. Once that's done, then re-think your choices: check if every single field you think is necessary is indeed mandatory.

After cutting down unnecessary fields, let's chop off redundant fields once again: if possible, merge fields such as First & Last Name, or a Birthdate date selector. Try to be flexible to what you can accept in a field, make use of autocomplete, group related elements, etc. The less effort is required to fulfill a task, the better it is.

```html
<fieldset>
  <div class="wrapper">
    <label for="name">Full name</label>
    <input type="text" name="name" id="name">
  </div>
  <div class="wrapper">
    <label for="email">Email</label>
    <input type="email" name="email" id="email">
  </div>
</fieldset>
```

## Keyboard

Many users use keyboard navigation while filling forms. It's much faster and easier to press <code class="inline-code">Tab</code>, or a mobile equivalent, than clicking on each field. And it's also how screen reader users browse the web too.

In order for their browsing experience to be positive, make sure you code your inputs following the correct navigation flow. Be also very careful when using JavaScript to hijack keyboard events: the initial behavior you replace must have the same feeling of "it was supposed to happen this way".

Have an example with our search input fields, where we visually changed users expectations — the input is actually smaller and without style in a styled container — but maintained logic behavior: when you click on the container, the focus is automatically set to the input. Test yourself anywhere on signo.

```html
<form class="js-search" role="search">
  <div class="js-container">
    <!-- Clicking anywhere in this container will focus the input -->
    <svg aria-hidden="true" width="18" height="18">…</svg>
    <!-- Notice how the inline SVG was hidden from screen readers
    as it is only decorative -->
    <input class="js-input" type="search" aria-label="Search through the signo website" placeholder="What do you want to make?" autocorrect="off" spellcheck="false" autocomplete="off" name="search" >
    <button class="js-searchCancel" type="button" aria-label="Clear Search"></button>
    <!-- This button element is empty but still read by screen readers
    thanks to a specific aria-label -->
  </div>
  <ol class="js-searchResults">
  </ol>
</form>
```

```js
container.addEventListener('click', () => {
  input.focus();
  // Here we add visual feedback for focus
  container.classList.add('active');
});
```

## Elements

You should always remain to existing tags like <code class="inline-code">&lt;input&gt;</code>, <code class="inline-code">&lt;select&gt;</code>, <code class="inline-code">&lt;radio&gt;</code>, etc., and set those elements with corresponding labels. The most basic functional example is:

```html
<label for="name">Name</label>
<input id="name" type="text" name="textfield">
```

It's already a pretty good base. You can only go in the right direction if you stop here. But now, let's group together some related fields with <code class="inline-code">&lt;fieldset&gt;</code>. Let's say we have a list of preferences for some services:

```html
<fieldset>
  <legend>How can we reach you?</legend>

  <input id="textmsg" type="checkbox" name="contact" value="textmsg">
  <label for="textmsg">Text Messages</label>

  <input id="email" type="checkbox" name="contact" value="email">
  <label for="email">Email</label>

  <input id="push" type="checkbox" name="contact" value="push">
  <label for="push">Push Notifications</label>
</fieldset>
```

Try out this code on your own with your screen reader, and see how great it is to have a nice code structure. Grouping is particularly recommended for radio buttons and checkboxes.

One last step to push the limits and come close to a perfect UX form experience is to use labels, sure, but combined with HTML placeholders and groups. Labels name the current field, and placeholders tell the person reading how to format their information.

```html
<form autocomplete="on">
  <fieldset>
    <div>
      <label for="name">Full name</label>
      <input type="text" name="name" id="name" spellcheck="false" maxlength="80" placeholder="First name Last name">
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" spellcheck="false" maxlength="254" placeholder="hello@me.com">
    </div>
  </fieldset>
  <fieldset>
    <div>
      <label for="address">Address</label>
      <input type="text" name="address" id="address" spellcheck="false" placeholder="Internet Street, 42">
    </div>
    <div>
      <label for="postal_code">Postal code</label>
      <input type="text" name="postal_code" id="postal_code" spellcheck="false" placeholder="1030">
    </div>
  </fieldset>
</form>
```
