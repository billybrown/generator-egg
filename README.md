# generator-egg
A yeoman generator for egg, a front-end starter kit for Echo & Co.

Very much in development.


--------
# egg


## to do

- **Basic Yeoman**
    - Be able to choose to use different plugins and update bower, etc. as necessary.
    - Be able to choose ie8 support. (add ie8 stylesheet and include it in grunt processes, add selectivizr)
- **Yeoman phase 2**
    - Be able to add CSS components. Add both the scss partial, the corrasponding scss partial and the @import line in the main.scss file.

## on hold

- **Scss linting**. The only grunt plugin for scss-lint requires a ruby dependency - which we don't want.
- **CSS linting**. I would love to lint the compiled css to make sure everything is getting outputted properly - but the CSSLint task throws errors on more complicated and modern css properties - rendering it useless (for now at least). Worth checking up on at a future date and integrating back in.
- **Critical CSS**. This requires scanning a compiled HTML document. Really only possible if doing a simple static site - otherwise this should be a discussion with the backend dev.
- **Uncss**. Similar to Critical CSS in that it requires scanning HTML. Discuss with backend dev as necessary.
- **Seperate Production and Development environments** - Might need to keep this general until Yeoman can be incorporated
    - Only have takana script in dev environment
    - unminified and unaggregated js/css/html in dev for easier debugging. In production aggregate and minify everything.

# Contributing

## Setup

- Clone this repo.

- From the directory root, install dependencies, link to node.  

`cd path/to/generator-egg`  
`npm install`  
`npm link`  

## Running  

- Start a new terminal session  

- Run the generator by name  

`yo egg`

- Follow the prompts
