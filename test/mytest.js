var jade = require('jade');
require('../lib/filters')(jade);

var html = jade.render(':php echo test filter!');
//var html = jade.render('p hello world 2');
console.log(html);
console.log('hello world');
