jade4php
========

A Jade filter to generate php code templates.

Fully supports all standard jade syntax and compile time variables and conditional code.

Added support for single line of text in filters where a text block does not follow the filter.

    e.g. :php if ($test == 1):

    as well as blocks of text:

        :php
          $var1 = 'foo';
          $var1 = 'bar';

Added a simple php function to return a formatted php string allowing it to be stored in a run time javascript variable.

    e.g. - test = php('$foo');

    will produce:

    <?php echo htmlspecialchars($foo, ENT_QUOTES, 'UTF-8'); ?>

Note: the formatted strings must be displayed Unescaped because the formatting includes <php and ?> characters.  Don't worry, the expression argument to the php function call is fully escaped at runtime.

However, note that it is possible to set a no_escape flag:

    - test = php('$foo', true);

    and this will produce:

    <?php echo $foo; ?>

## Usage

    var jade = require('jade');
    var jade4php = require('jade4php');

    jade4php(jade);

    var html = jade.render('string of jade');

## Example

    doctype html
    //- normal jade variable
    - title = 'Example & Test';
    //- php function call to format an escaped
    //- echo statement of expression argument
    - test = php('$test_var + 1');
    //- php function call to format an echo
    //- statement of expression argument without escape prcessing
    - bad = php('$foo', true);
    html
      head
        // normal jade interpolation
        title #{title}
      body
        // php filter
        :php if ($test == 1):
        p PHP variable $test has value of 1
        :php else:
        p PHP variable $test has some other value
        :php endif;
        p
          :php(echo) 'SINGLE LINE <echo> with escape'
        // normal jade interpolation
        p.
          This way is shortest if you need big !{test}
          blocks of text spanning multiple
          lines.
        // note that these interpolations of PHP strings must not be escaped
        p!= test
        p!= bad
        // what happens when the PHP string is escaped
        p= test

Will produce:

    <!DOCTYPE html>
    <html>
      <head>
        <!-- normal jade interpolation-->
        <title>Example &amp; Test</title>
      </head>
      <body>
        <!-- php filter-->
        <?php if ($test == 1): ?>
        <p>PHP variable $test has value of 1</p>
        <?php else: ?>
        <p>PHP variable $test has some other value</p>
        <?php endif; ?>
        <p><?php echo htmlspecialchars('SINGLE LINE <echo> with escape', ENT_QUOTES, 'UTF-8'); ?>
        </p>
        <!-- normal jade interpolation-->
        <p>
          This way is shortest if you need big <?php echo htmlspecialchars($test_var + 1, ENT_QUOTES, 'UTF-8'); ?>
          blocks of text spanning multiple
          lines.
        </p>
        <!-- note that these interpolations of PHP strings must not be escaped-->
        <p><?php echo htmlspecialchars($test_var + 1, ENT_QUOTES, 'UTF-8'); ?></p>
        <p><?php echo $foo; ?></p>
        <!-- what happens when the PHP string is escaped-->
        <p>&lt;?php echo htmlspecialchars($test_var + 1, ENT_QUOTES, 'UTF-8'); ?&gt;</p>
      </body>
    </html>

## Updates

    :php
        echo 'this is some stuff';
        print('some more stuff');

    :php echo 'some inline stuff';

    a
        :php(short=true, inline=true)
            'more stuff'
