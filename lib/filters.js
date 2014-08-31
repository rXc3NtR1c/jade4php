
module.exports = function (jade) {

    if (typeof jade === typeof undefined) {
        jade = require('jade');
    }

    var constantinople = require('constantinople')

   	php = function (exp, no_escape) {

   		// set default value for no_escape to false
        if (typeof no_escape === typeof undefined) { 
        	no_escape = false; 
        }

        if (no_escape === true) { 
        	return '<?php echo ' + exp + '; ?>'; 
        }

        return '<?php echo htmlspecialchars(' + exp + ', ENT_QUOTES, \'UTF-8\'); ?>';
    }

    jade.filters.php = function (text, options) {

    	if (typeof options.echo === typeof undefined) { 
    		return '<?php ' + text + ' ?>';
    	} 

    	return '<?php echo htmlspecialchars(' + text + ', ENT_QUOTES, \'UTF-8\'); ?>';        

    }

    // Allow custom filters to process text to end of line if no text block following
    jade.Parser.prototype.parseFilter = function(){
        var tok = this.expect('filter');
        var attrs = this.accept('attrs');
        var block;

        block = this.parseTextBlock();
        if (typeof block == typeof undefined) {
            block = new jade.nodes.Block;
            var text = this.parseText();
            block.push(text);
        }

        var options = {};
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
