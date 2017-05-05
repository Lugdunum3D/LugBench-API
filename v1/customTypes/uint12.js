'use strict';

module.exports = (mongoose) => {
    function Uint12(key, options) {
        mongoose.SchemaType.call(this, key, options, 'Uint12');
    };

    Uint12.prototype = Object.create(mongoose.SchemaType.prototype);

    Uint12.prototype.cast = (val) => {
        let _val = Number(val);

        if (isNaN(_val)) {
            throw new Error('Uint12: ' + val + ' is not a number');
        }
        _val = Math.round(_val);
        if (_val < 0 || _val > 0xFFF) {
            throw new Error('Uint12: ' + val +
                ' is outside of the range of valid unsigned 12-bit ints');
        }
        return _val;
    };

    mongoose.Schema.Types.Uint12 = Uint12;
};
