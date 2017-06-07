# Screen Readers

## What it is

A screen reader will be your best friend in the world of accessibility development. It's the generic term for a program that helps vision-impaired people to use a computer. In other words, a screen reader will literally "read" out loud the content of page elements to person using it.

<img alt="This is a screen capture of the system preferences menu featuring an Accessibility category in macOS Sierra" src="@@webRoot/assets/img/doc-sr-osx.png" srcset="@@webRoot/assets/img/doc-sr-osx.png 1x, @@webRoot/assets/img/doc-sr-osx@2x.png 2x, @@webRoot/assets/img/doc-sr-osx@3x.png 3x">

Some systems like Android™, iOS™ and macOS™ include an internal screen reader, but there are over 15 screen readers on the market today which can be used on multiple operating systems. The mostly used ones are available in [our Resource section](@@webRoot/tools/resources).

## How it works

So, a screen reader program has hundreds of commands which can be summoned by the impaired person to find out what the computer screen is showing.

For the sake of simplicity and because screen readers all feature common patterns, we will mainly focus on VoiceOver. There are two ways of using it while browsing the web: whether by grouping items — e.g. an <code class="inline-code">ul</code> will be one group and you can decide to enter a group by pressing the down arrow — or whether by DOM Order — this method will automatically go down the DOM tree, so <code class="inline-code">li</code> elements will be read after reaching the <code class="inline-code">ul</code>.

<img alt="VoiceOver on macOS iterating through DOM elements" src="@@webRoot/assets/img/doc-sr-interaction.png" srcset="@@webRoot/assets/img/doc-sr-interaction.png 1x, @@webRoot/assets/img/doc-sr-interaction@2x.png 2x, @@webRoot/assets/img/doc-sr-interaction@3x.png 3x">

See, while browsing through DOM nodes, VoiceOver highlights the current zone and describes what it is by voice, but also by text in the bottom corner.

## How to use it

First time users will obviously be lost. But after playing for a few minutes with keyboard navigation, you easily get the hang of it.

Start off VoiceOver by pressing the <code class="inline-code">cmd ⌘</code> + <code class="inline-code">fn</code> + <code class="inline-code">F5</code> keys together to bring the VoiceOver dialog. And boom! That's it, you're using an on-screen reader. To stop it, use the same key combination.

Next step is getting used to commands. Basically, you only need to move around using the keyboard arrows and follow the VoiceOver instructions. There is still another option to web browsing with VoiceOver: the rotor, which is a list of navigational elements present on the current page.

<img alt="VoiceOver on macOS displaying the rotor selector" src="@@webRoot/assets/img/doc-sr-rotor.png" srcset="@@webRoot/assets/img/doc-sr-rotor.png 1x, @@webRoot/assets/img/doc-sr-rotor@2x.png 2x, @@webRoot/assets/img/doc-sr-rotor@3x.png 3x">

This is a little bit more advanced, but try opening it by pressing the <code class="inline-code">ctrl</code> + <code class="inline-code">alt ⌥</code> + <code class="inline-code">U</code>. Once the rotor is activated, you can switch its screens by using the left and right arrows, and up and down for the current screen. The rotor will basically display your document structure, allowing users to jump quickly to relevant content.

One last key: <code class="inline-code">↵</code>. Obviously, use it to select links, buttons, etc. and highlighted rotor elements.
