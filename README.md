# TidyBlocks Revisited

Contributions of all kinds are welcome.
By offering a contribution, you agree to abide by our [Code of Conduct](CONDUCT.md)
and that your work may be made available under the terms of [our license](LICENSE.md).

1.  To report a bug or request a new feature,
    please check the [list of open issues](https://github.com/gvwilson/briq/issues)
    to see if it's already there,
    and if not,
    file as complete a description as you can.

1.  If you have made a fix or improvement,
    please create a [pull request](https://github.com/gvwilson/briq/pulls).
    We will review these as quickly as we can (typically within 2-3 days).

## Actions

-   `npm run build`: regenerate `tidyblocks.min.js`, then open `index.html` to see it.
    This is currently broken.

-   `npm run jeff`: regenerates `jeff.min.js` for testing, then open `jeff.html` to see it.
    Drag out a few blocks, then open the console and run `jeff.getCode()` to see the JSON for the blocks.

-   `npm run coverage`: run tests and report code coverage (open `coverage/index.html` to see results).

-   `npm run docs`: regenerate code documentation (open `docs/index.html` to view).

-   `npm run fixtures`: regenerate small programs for interactive testing.

-   `npm run lint`: run code style check.

-   `npm run test`: run tests without code coverage (which is faster).

## Organization

TidyBlocks uses Blockly for the user interface and Jekyll for the website as a whole.

### Source

-   `libs/util.js`: low-level utilities.

-   `libs/dataframe.js`: operations on data tables.

-   `libs/expr.js`: operations on table rows.
    These may be nested (i.e., `add(multiply(2, column('red')), column('blue'))`

-   `libs/summarize.js`: summarization operations (such as `sum` and `max`).

-   `libs/statistics.js`: statistical tests.

-   `libs/stage.js`: operations on entire tables.
    These use expressions, summarizers, and statistical tests.

-   `libs/pipeline.js`: pipelines made up of stages.

-   `libs/program.js`: programs made up of pipelines.

-   `libs/json2obj.js`: convert serialized JSON to programs, pipelines, stages, and expressions.
    (These objects know how to convert themselves *to* JSON.)

-   `libs/environment.js`: the runtime environment for a program
    that stores datasets, records error messages, and so on.

-   `libs/ui.js` and `libs/browser.js`: handle interactions with the user.
    **FIXME: these two files should be combined into one.**

-   `blocks/*.js`: implementation of blocks.

### Other Files

-   `index.html`: user interface page.

-   `index.js`: gathers contents of `libs/*.js` for bundling to create `tidyblocks.min.js`.

-   `jeff.html`: testing interface page.

-   `jeff.js`: gathers blocks for bundling to create `jeff.min.js` for testing.

-   `test/test_*.js`: unit tests.

-   `static/ui.css`: CSS for the user interface.

-   `_config.yml`: Jekyll configuration file.

-   `_data/*`, `_includes/*`, and `_layouts/*`: Jekyll site generation files.

-   `coverage/*`: code coverage data generated by `npm run coverage`.

-   `data/*`: built-in datasets.

-   `docs/*`: JSDoc code documentation generated by `npm run docs`.

-   `fixtures/*`: small programs to load for interactive testing.
    Regenerate using `npm run fixtures` after any change to JSON serialization.

-   `guide/*`: source for user guide (written with Jekyll).
    **FIXME: incomplete.**
