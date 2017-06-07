# Writing

## Typography

Typography is essential to a good design. The first step to make an accessible choice is, of course, choosing a legible typeface. Sans-serif fonts are proven to be more legible because the level of detailing serifs offer can cause trouble for certain visually-impaired people.

### Proportions

Another important factor resides in the visual aspect of your font. Proportions are crucial for legibility, and you should prefer fonts with characters that are easily identifiable. The X-height of a font, which represents the distance between the baseline and the midline of lower-case letters — typically a x, is also what makes it a legible font.

<img alt="x-height representation of the Axiforma font" src="@@webRoot/assets/img/doc-writing-height.png" srcset="@@webRoot/assets/img/doc-writing-height.png 1x, @@webRoot/assets/img/doc-writing-height@2x.png 2x, @@webRoot/assets/img/doc-writing-height@3x.png 3x">

### Weight

Font weights vary between Ultra Light and Ultra Black, but not all fonts include each set of weight. Standardized values defined by the W3C exist between 100 and 900. The key to balance weight and legibility is to avoid characters which become too thin for the eye. A good exercise for trying out your font weight is squinting your eyes to check if you can still see.

<img alt="Different font weights available in the Axiforma family" src="@@webRoot/assets/img/doc-writing-weight.png" srcset="@@webRoot/assets/img/doc-writing-weight.png 1x, @@webRoot/assets/img/doc-writing-weight@2x.png 2x, @@webRoot/assets/img/doc-writing-weight@3x.png 3x">

### Line height

This is another essential. Mastering line height will not only make your text legible, but also readable, because of the increased visual comfort and appeal. Headings and copy require different values:

- depending on your font, for text copy, we recommend a line height value between <code class="inline-code">125%</code> and <code class="inline-code">150%</code>;
- headings require lower values because of increased font size, so as low as <code class="inline-code">100%</code>.

## Text size

It's a no-brainer, of course. Text size is really important for both legibility and readability. For general paragraph text, we recommend sticking to <code class="inline-code">1em</code>, which is the default web sizing, equivalent to <code class="inline-code">16px</code>.

Further than setting text size, while designing your UX and integrating it, you should think about text sizing defined by the user. Zoomed text up to 200% should still be able to fit your interface without information truncating.

<div class="exemple">
  <figure>
    <div>
      <img aria-describedby="figure-1" src="@@webRoot/assets/img/doc-writing-size-1.png" srcset="@@webRoot/assets/img/doc-writing-size-1.png 1x, @@webRoot/assets/img/doc-writing-size-1@2x.png 2x, @@webRoot/assets/img/doc-writing-size-1@3x.png 3x">
    </div>
    <figcaption id="figure-1">
      <p>Do</p>
      <p>These cards follow the content based on the zoom imposed by the user and information is still complete.</p>
    </figcaption>
  </figure>
  <figure>
    <div>
      <img aria-describedby="figure-2" src="@@webRoot/assets/img/doc-writing-size-2.png" srcset="@@webRoot/assets/img/doc-writing-size-2.png 1x, @@webRoot/assets/img/doc-writing-size-2@2x.png 2x, @@webRoot/assets/img/doc-writing-size-2@3x.png 3x">
    </div>
    <figcaption id="figure-2">
      <p>Don't</p>
      <p>These cards don't take in consideration the browser zoom and the displayed text is only partial.</p>
    </figcaption>
  </figure>
</div>

## Tone of voice

While writing for accessibility-friendly content, keep in mind the audience you are addressing to. A few on-the-go tips would be:

- be precise and concise;
- avoid directional language like "Select options in the sidebar" but "Select from these options" instead;
- use information hierarchy, with headers like <code class="inline-code">h1</code> for top-level, going down with <code class="inline-code">h2</code> and <code class="inline-code">h3</code>, and so on;
- keep it simple;
- use meaningful link text, unlike "click here";
- think of descriptive image alternatives.
