# Egg CSS Naming Conventions

_Much of this has been taken and modified from [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md), [BEM Syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), and [this article](https://medium.com/@drublic/css-naming-conventions-less-rules-more-fun-12af220e949b)._

Egg relies on _structured class names_ and _meaningful hyphens_ (i.e., not
using hyphens merely to separate words). This helps to work around the current
limits of applying CSS to the DOM (i.e., the lack of style encapsulation), and
to better communicate the relationships between classes.

The primary architectural division is between **components**, **descendents**, **variants**, **utilities**, and **state indicators**.

**Table of contents**

* [ComponentName](#Components)
* [ComponentName__descendentName](#Descendents)
* [ComponentName--variantName](#Variants)
* [u-utilityName](#Utilities)
* [is-stateOfComponent](#is-stateOfComponent)


<a name="Components"></a>
## Components

The CSS responsible for component-specific styling. 

Syntax: `ComponentName`

The component's name must be written in pascal case. Nothing else in the
HTML/CSS uses pascal case.

```css
.MyComponent { /* … */ }
```

```html
<article class="MyComponent">
  …
</article>
```


<a name="Descendents"></a>
## Descendents

A component descendent is a class that is attached to a descendent node of a
component. It's responsible for applying presentation directly to the
descendent on behalf of a particular component. 

Syntax: `ComponentName__descendentName`

Descendent names start with its parent component, followed by a single dash,
then the descendent name written in camel case.

```html
<article class="Tweet">
  <header class="Tweet__header">
    <img class="Tweet__avatar" src="{{src}}" alt="{{alt}}">
    …
  </header>
  <div class="Tweet__bodyText">
    …
  </div>
</article>
```


<a name="Variants"></a>
## Variants

A variant is a class that modifies the presentation of the base
component in some form (e.g., for a certain configuration of the component).

Syntax: `MyComponent--variantName`

Variant names must be written in camel case and start with the base component. Two
dashes are used inbetween the component and variant names. The class should be included 
in the HTML _in addition_ to the base component class. 

This means that the same state names can be used in multiple contexts, but
every component must define its own styles for the state (as they are scoped to
the component).

```css
/* Core button */
.Button { /* … */ }
/* big red button style */
.Button.Button--bigRed { /* … */ }
```

```html
<button class="Button Button--bigRed" type="button">…</button>
```


<a name="Utilities"></a>
## Utilities

Low-level structural and positional traits. Utilities can be applied directly
to any element within a component.

Syntax: `u-utilityName`

### u-utilityName

Utilities must use a camel case name. What follows is an example of how various
utilities can be used to create a simple structure within a component.

```html
<div class="u-cleafix">
  <a class="u-floatLeft" href="{{url}}">
    <img class="u-block" src="{{src}}" alt="">
  </a>
  <p class="u-sizeFill u-textBreak">
    …
  </p>
</div>
```


<a name="is-stateOfComponent"></a>
## State Indicators

Use `is-stateName` to reflect changes to a component's state coming from javascript. 

Syntax: `is-stateOfComponent`

The state name must be camel case. **Never style these classes directly; 
they should always be used as an adjoining class.**

```css
.Tweet { /* … */ }
.Tweet.is-expanded { /* … */ }
```

```html
<article class="Tweet is-expanded">
  …
</article>
```
