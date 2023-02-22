import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { SuccessContainer, SuccessImage } from "../styles/pages/success";

interface PropsItemsSuccess {
  product : {
    customerName: string
    name: string
    imageUrl: string
  }
}
export default function Success({ product }:PropsItemsSuccess) {

  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

        <SuccessImage>
          <Image src={product.imageUrl} alt='' width={130} height={145}/>
        </SuccessImage>

        <p>
          Uhuul! <strong>{product.customerName}</strong>, sua 
          <strong>{product.name}</strong> já está
          a caminho de sua casa
        </p>

      <Link href='/' passHref legacyBehavior>
        <a>
          Voltar ao Catálago
        </a>
      </Link>
    </SuccessContainer>
  )
}

//cliente side-useEffects, *getStatitcsProps, getSserverSideProps

export const getServerSideProps: GetServerSideProps = async ({ query, params}) => {
  const sessionId = String(query.session_id)
  
  // console.log( sessionId)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items','line_items.data.price.product']
  })

  const customerName = session.customer_details?.name
  const product = session.line_items!.data[0].price?.product as Stripe.Product

  return {
    props: {
      product: {
        customerName,
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  } 
}