import { Router } from 'express'
import { asyncHandler } from '../utils/async.helper.js'
import { doPaypalPayment, doStripePayment } from '../app/controller/payment.controller.js'



function route(app) {
    app.use('/', mainRoute)
}


const mainRoute = Router()


// Ignore all the middleware since this shjt is no needed.


mainRoute.post(
    '/payment-check',
    asyncHandler(doStripePayment)
)

mainRoute.post(
    '/verify-payment',
    asyncHandler(doPaypalPayment)
)

export default route