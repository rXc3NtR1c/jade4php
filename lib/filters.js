
module.exports = function (jade) {

    if (typeof jade  === typeof undefined) {
        jade = require('jade');
    }

    // simple callable function to return a PHP echo string for the supplied expression
   	php = function (exp, no_escape) {

   		// set default value for no_escape to false
        if (typeof no_escape  === typeof undefined) { 
        	no_escape = false; 
        }

        if (no_escape === true) { 
        	return '<?php echo ' + exp + '; ?>'; 
        }

        return '<?php echo htmlspecialchars(' + exp + ', ENT_QUOTES, \'UTF-8\'); ?>';
    }

    // Regular Jade Filter for PHP
    jade.filters.php = function (text, options) {

    	if (typeof options.echo  === typeof undefined) { 
    		return '<?php ' + text + ' ?>';
    	} 

    	return '<?php echo htmlspecialchars(' + text + ', ENT_QUOTES, \'UTF-8\'); ?>';        

    }

    // Allow custom filters to process text to end of line if no text block following
    jade.Parser.prototype.parseFilter = function(){
        var tok = this.expect('filter');
        var attrs = this.accept('attrs');
        var block;

        if ('indent' == this.peek().type) {
          this.lexer.pipeless = true;
          block = this.parseTextBlock();
          this.lexer.pipeless = false;
        } else {
            block = new jade.nodes.Block;
            var text = this.parseText();
            block.push(text);
        }

        var node = new jade.nodes.Filter(tok.val, block, attrs && attrs.attrs);
        node.line = this.line();
        return node;
    }

};
