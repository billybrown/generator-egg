# generator-egg
A yeoman generator for egg, a front-end starter kit for Echo & Co.

Very much in development.

Please feel free to take on any of these things below - or add new stuff.

## to do

- **Javascript** Need to figure out boilerplate js code for integrating new custom bits of js. Also need to consider integrating prototype and a global theme class. Need to connect with @wpatt about this.
-- All custom js will then need to be refactored. Make sure partials can call from eachother (cover/offcanvas/modal all need to work together)
-- a egg:newjs sub generator will then need to be created
- **Moar Usage**. I generally need to just use everything more and make more sites. Specifically need to pay attention to:
-- Layout and grid mixins. I think this could be better.
-- Chosen and select element integration. This seems buggy.
-- mobile menus and hamburger icon integration. Seems buggy.
-- Text styles. Always a bit of a pain - consider ways to use yeoman to speed up.
-- Post feilds (filtering interface, subtitle, author, etc.). Consider using yeoman to add.


### on hold

- **Scss linting**. The only grunt plugin for scss-lint requires a ruby dependency - which we don't want.
- **CSS linting**. I would love to lint the compiled css to make sure everything is getting outputted properly - but the CSSLint task throws errors on more complicated and modern css properties - rendering it useless (for now at least). Worth checking up on at a future date and integrating back in.
- **Critical CSS**. This requires scanning a compiled HTML document. Really only possible if doing a simple static site - otherwise this should be a discussion with the backend dev.
- **Uncss**. Similar to Critical CSS in that it requires scanning HTML. Discuss with backend dev as necessary.
- **takana**. Takana requires v0.12 of node to work properlly. I would love to figure out how to use the most recent version of node (v4) and still have Takana work. This is a Takana issue and not an Egg one ... figured I'd mention it here though.
- **Stats**. Currently there is a 'grunt stats' task that will output some stats on the compiled css. I'd love for there to be more stuff here. JS stats, Performance stats, etc. Something that we can use to develop benchmarks. We need to figure out those benchmarks first though - not sure how best to integrate all of this. Seems like a *Phase 2* type of thing.


## Contributing

### Setup

- Clone this repo.

- From the directory root, install dependencies, link to node.  

`cd path/to/generator-egg`  
`npm install`  
`npm link`  

### Running  

- Start a new terminal session  

- Run the generator by name  

`yo egg`

- Follow the prompts
