const productRoute = require('./modules/products.routes')

module.exports = function(app)  {
    app.use('/products', productRoute)
}