module.exports = function (mongoose) {
    function Formats(key, options) {
        mongoose.SchemaType.call(this, key, options, 'Formats');
    };

    Formats.prototype = Object.create(mongoose.SchemaType.prototype);

    Formats.prototype.cast = function (val) {
        let _val = val;

        if (!(_val instanceof Array)) {
            throw new Error(_val + " is not an array");
        } else if (_val.length != 2) {
            throw new Error('Not enough parameters');
        } else if ((typeof _val[0].toString()) != 'string') {
            throw new Error(_val[0] + ` (first parameter of ${_val}) is not a String`);
        } else if (!(_val[1] instanceof Object)) {
            throw new Error(_val[1] + ` (second parameter of ${_val}) is not an Object`);
        }
        return _val;
    };

    mongoose.Schema.Types.Formats = Formats;
};
