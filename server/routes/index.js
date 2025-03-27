import {Router} from 'express'
import { asyncHandler } from '../utils/async.helper.js'
import { doPayment } from '../app/controller/payment.controller.js'



function  route(app){
    app.use('/', mainRoute)
}


const mainRoute = Router()

mainRoute.post(
    '/payment-check',
     asyncHandler(doPayment)
)

export default route