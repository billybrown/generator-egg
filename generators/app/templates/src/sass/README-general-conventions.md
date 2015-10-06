# Egg CSS General Conventions

The following are some guidelines to writing CSS inside of Egg.

* one CSS declaraction per line (except for rare, special circumstances)
* one empty line after each CSS declaration
* one CSS element per line (except for rare, special circumstances)
* one new line at the end of the file


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
