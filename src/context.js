const { init } = require('./options');

class Context {
    constructor(types, options={}, id=0){
        this.types = types;
        this.options = init(options);
        this.id = id;
    }
    set setOptions(options) {
        this.options = init(options);
    }
}

module.exports = Context;