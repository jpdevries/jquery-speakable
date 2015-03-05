# Contributing

## Important notes
Please don't edit files in the `dist` subdirectory as they are generated via Grunt. You'll find source code in the `src` subdirectory! Not currently using unit tests as PhantomJS doesn't have SpeechSynthesis so there isn't much to test.

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.**

### Tests
`PhantomJS` doesn't support `window.speechSynthesis`, so there isn't much automation to do regarding testing `speakable.jquery.js`. Tests are in `tests/**/*.html`. For example `speak.html` has a list of headers that can be clicked to be tested. Each should read the correct transcript aloud. 

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI is installed by running `grunt --version`.  If the command isn't found, run `npm install -g grunt-cli`.  For more information about installing Grunt, see the [getting started guide](http://gruntjs.com/getting-started).

1. Fork and clone the repo.
2. Run `npm install` to install all dependencies (including Grunt).
3. Run `grunt build && grunt` to grunt this project.
4. Run `grunt watch` to watch for changes.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing is broken.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
2. Update the documentation to reflect any changes.
3. Push to your fork and submit a pull request.
