const { cartFormatError } = require('../constant/err.type')
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
            console.log('skjsks')
        } catch (error) {
            console.error(error)
            cartFormatError.result = error
            console.log('skjsks是')
            return ctx.app.emit('error', invalidGoodsID, ctx)

        }
        await next()
    }




}
module.exports = {
    validator,

}