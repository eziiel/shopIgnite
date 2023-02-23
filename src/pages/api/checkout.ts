import { stripe } from "../../lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { METHODS } from "http";

const key= 'sk_test_51McurwAAdVH5EhKbj6SO2biL4TaOqTNsPj2XOwz9I560vnOuAYVgYbDsTa834vdCRoav19rzBwRWJQ4JnzHjonD400idYId0pY'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body

  if(req.method !== 'POST') {
    res.status(405).json({error : 'Method not allowed'})    
  }
  
  if(!priceId ) {
    res.status(400).json({error : 'price not found'})    
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ]
  })

  return res.status(201).json({
    checkoutURL : checkoutSession.url
  })
}