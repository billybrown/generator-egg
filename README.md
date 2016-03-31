# generator-egg
A yeoman generator for egg, a front-end starter kit for Echo & Co.

Very much in development.

Please feel free to take on any of these things below - or add new stuff.


## to do

- Find and incorporate a better modal plugin. Must allow for absolute positioning instead of fixed (like bootstrap's modal).
- Find and incorporate a sass grid plugin that works with Takana. Needs to be semantic. Then remove my custom grid mixins.
- Better incorporation of Chosen plugin. Refactor the scss so it's easier to customize.
- Need more testing with ie8 support
- Sub generators should remember if they are working within a pattern library
- Offcanvas mobile menu js needs work (especially with the cover js)
- Incorporate Takana from the get go.


### Stuff on hold

- **Critical CSS**. This requires scanning a compiled HTML document. Really only possible if doing a simple static site - otherwise this should be a discussion with the backend dev.
- **Uncss**. Similar to Critical CSS in that it requires scanning HTML. Discuss with backend dev as necessary.


### Phase 2 Considerations

- **Style Guide integration** It might be a good idea to have a tab in the pattern library for typical style guide type things. Client logo, main typography, colors, etc. Not necessarily web elements or classes, but a general overview of what the look and feel of the organization is. Coule be client facing.
- **Performance Metrics.** Currently there is a 'grunt stats' task that will output some stats on the compiled css. I'd love for there to be more stuff here. JS stats, Performance stats, etc. Something that we can use to develop benchmarks. We need to figure out those benchmarks first though - not sure how best to integrate all of this.
- **Linting.**
  - **Scss linting**. The only grunt plugin for scss-lint requires a ruby dependency - which we don't want.
  - **CSS linting**. I would love to lint the compiled css to make sure everything is getting outputted properly - but the CSSLint task throws errors on more complicated and modern css properties - rendering it useless (for now at least). Worth checking up on at a future date and integrating back in.
  - **JS linting**. We currently have jslint integration, but I don't quite understand it. It seems way overly strict. Would like to devote some time to getting this how we need it.
- **Stress testing**. It would be great if there was a way to deliver different amounts of content to elements to test how things would look with varrying lengths/types of text of images. Not sure how that would work, but it would be a good feature.


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
