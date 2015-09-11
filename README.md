# generator-egg
A yeoman generator for egg, a front-end starter kit for Echo & Co.

Very much in development.

Please feel free to take on any of these things below - or add new stuff.

## to do

- **Is the Egg theme a dependency of the Egg Generator?** I need to figure out how to actively work on Egg theme files (sass, grunt config, js, etc.) while also allowing the egg generator to shape those theme files with yeoman for new projects. I need help figuring out the proper workflow here. One option would be to duplicate and underscore everything that gets generated (how we're handing package.json and bower.json) - but that creates a lot of duplication which makes maintaining everything a pain.
- **Echo Index**. Need to figure out a way to bring in this site/repo into this project. Seems silly to have them seperate. https://github.com/billybrown/EchoIndex - http://b.illbrown.com/EchoIndex/
- **Moar Usage**. I need people to start using these tools to find their problems.

--------
## egg theme tasks
These tasks are not related to yeoman generator - just the theme itself.

- **Moar Stats**. Currently there is a 'grunt stats' task that will output some stats on the compiled css. I'd love for there to be more stuff here. JS stats, Performance stats, etc. Something that we can use to develop benchmarks.
- **Takana**. I'd love to properly add Takana into the theme - right now I just run it locally. Takana isn't super well maintained so it would require a lot of documentation and trial and error. (@billybrown will do this task since he already knows a good bit about the issues here)
- **CSS partial organization review**. Honestly I'm not so sure about how I've seperate things out. Would love some thoughts about it.
- **Better rules around utility classes vs components**. Sometimes it's not very clear when to use a utility class or a component class to apply certain styles. For example typography styles on a component title - use a utility class? Or are those styles unique to the component? Need to figure out some hard rules here.

### on hold

- **Scss linting**. The only grunt plugin for scss-lint requires a ruby dependency - which we don't want.
- **CSS linting**. I would love to lint the compiled css to make sure everything is getting outputted properly - but the CSSLint task throws errors on more complicated and modern css properties - rendering it useless (for now at least). Worth checking up on at a future date and integrating back in.
- **Critical CSS**. This requires scanning a compiled HTML document. Really only possible if doing a simple static site - otherwise this should be a discussion with the backend dev.
- **Uncss**. Similar to Critical CSS in that it requires scanning HTML. Discuss with backend dev as necessary.
- **takana**. Takana requires v0.12 of node to work properlly. I would love to figure out how to use the most recent version of node (v4) and still have Takana work. This is a Takana issue and not an Egg one ... figured I'd mention it here though.


--------
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
