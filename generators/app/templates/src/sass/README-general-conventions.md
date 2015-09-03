# Egg CSS General Conventions

The following are some guidelines to writing CSS inside of Egg.

* one CSS declaraction per line (except for rare, special circumstances)
* one empty line after each CSS declaration
* one CSS element per line (except for rare, special circumstances)
* one new line at the end of the file


## Partial Folder Names and grouping

Egg has the following folders to group sass partials with similar type partials:

* base - the most basic, default styles. This includes a css reset/normalize and any custom resets, a print stylesheet, your Sass variables and a folder containing any vendor mixins.
* utilities - These are all partials containging classes with the syntax of 'u-loremIpsum'. These are utility styles
which get used through the site. For things like text, layout, spacing, etc.
* elements - These styles apply directly to html elements. 
* objects - These are custom CSS objects that we've made up for the site. Very modular and repeatable.
* areas - These are technically CSS objects, but they are things that are really only represented once on the site. Things like the SiteHeader or the MobileMenu. Very more complex areas where splitting things further into more partials is helpful - you can add additional folders here (like for the site header and footer).


## CSS Commenting Conventions

This is at the top of a css file to explain what it is:

```css
/////////////////////////////////////-+++-/////////////////////////////////////////
// CSS Object name
// Description of CSS Object
/////////////////////////////////////-+++-/////////////////////////////////////////
```

This is a section header inside of the same css file:

```css
/////////////////////////////////////-+++-
// Section title and description
```

This is a basic comment about some css:

```css
// Description of what the following selector does
// reference link
```

This is when you need to note a specfific declaration:

```css
.exampleClass {
	margin: 10px !important; // description of why you used !important
}
```
