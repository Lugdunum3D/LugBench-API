'use strict'

module.exports = (mongoose) => {
    function Uint10(key, options) {
        mongoose.SchemaType.call(this, key, options, 'Uint10')
    }

    Uint10.prototype = Object.create(mongoose.SchemaType.prototype)

    Uint10.prototype.cast = (val) => {
        let _val = Number(val)

        if (isNaN(_val)) {
            throw new Error('Uint10: ' + val + ' is not a number')
        }
        _val = Math.round(_val)
        if (_val < 0 || _val > 0x3FF) {
            throw new Error('Uint10: ' + val +
                ' is outside of the range of valid unsigned 10-bit ints')
        }
        return _val
    }

    mongoose.Schema.Types.Uint10 = Uint10
}
