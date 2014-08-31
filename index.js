module.exports = function (jade) {

    if (typeof jade  === typeof undefined) {
        jade = require('jade');
    }
    
    require('./lib/filters')(jade);
};
