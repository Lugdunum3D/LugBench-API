'use strict';

module.exports = (mongoose) => {
    function Formats(key, options) {
        mongoose.SchemaType.call(this, key, options, 'Formats');
    };

    Formats.prototype = Object.create(mongoose.SchemaType.prototype);

    Formats.prototype.cast = (val) => {
        if (!(val instanceof Array)) {
            throw new Error(val + " is not an array");
        } else if (val.length != 2) {
            throw new Error('Not enough parameters');
        } else if ((typeof val[0].toString()) != 'string') {
            throw new Error(val[0] + ` (first parameter of ${val}) is not a String`);
        } else if (!(val[1] instanceof Object)) {
            throw new Error(val[1] + ` (second parameter of ${val}) is not an Object`);
        }
        return val;
    };

    mongoose.Schema.Types.Formats = Formats;
};
