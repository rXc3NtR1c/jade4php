
module.exports = function (jade) {

    if (typeof jade === typeof undefined) {
        jade = require('jade');
    }

    var constantinople = require('constantinople')

    php_echo = function (exp, no_escape) {

        // set default value for no_escape to false
        if (typeof no_escape === typeof undefined) {
         no_escape = false;
        }

        if (no_escape === true) {
             return '<?php echo ' + exp + '; ?>';
        }

        return '<?php echo htmlspecialchars(' + exp + ', ENT_QUOTES, \'UTF-8\'); ?>';
     }

    php_print = function (exp, special) {

        // set default value for no_escape to false
        if (typeof special === typeof undefined) {
            special = false;
        }

        if (special === true) {
            return '<?php print(htmlspecialchars(' + exp + ', ENT_QUOTES, \'UTF-8\')); ?>';
        }

        return '<?php print(' + exp + '); ?>';
    }

    php_short = function (exp, special) {

         // set default value for no_escape to false
         if (typeof special === typeof undefined) {
             special = false;
         }

         if (special === true) {
             return '<?= htmlspecialchars(' + exp + ', ENT_QUOTES, \'UTF-8\'); ?>';
         }

         return '<?= ' + exp + '; ?>';
    }

    jade.filters.php = function (text, options) {
        var nl = '\n';
        var st = '<?';
        var et = '?>'

        if (typeof options.inline !== typeof undefined) {
            nl = '';
        }

        if (typeof options.short === typeof undefined) {
            st += 'php';
        }

    	if (typeof options.echo === typeof undefined) {
            // this should probably just be a formatted string
    		return nl + st + nl + ' ' + text + ' ' + nl + et;
    	}

    	return st +' echo htmlspecialchars(' + text + ', ENT_QUOTES, \'UTF-8\'); ' + et;

    }

    // Allow custom filters to process text to end of line if no text block following
    jade.Parser.prototype.parseFilter = function(){

        var tok = this.expect('filter');
        var attrs = this.accept('attrs');
        var block;
        var options = {};

        block = this.parseTextBlock();
        if (typeof block == typeof undefined) {
            block = new jade.nodes.Block;
            var text = this.parseText();
            block.push(text);
            options['inline'] = constantinople.toConstant(true);
        }

        if (attrs) {
          attrs.attrs.forEach(function (attribute) {
            options[attribute.name] = constantinople.toConstant(attribute.val);
          });
        }

        var node = new jade.nodes.Filter(tok.val, block, options);
        node.line = this.line();
        return node;
  }

};
