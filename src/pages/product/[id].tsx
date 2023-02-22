import { stripe } from '@/src/lib/stripe'
import { ProductContainer, ProductImage, ProductInfo } from '@/src/styles/pages/product'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Stripe from 'stripe'

interface ProductsProps {
  product: {
    id: string
    name: string
    imgUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}


export default function Product({ product }: ProductsProps) {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession] = React.useState(false)
  const { isFallback } = useRouter()
  if(isFallback) {
    return <p> Loading...</p>
  }
  
  const handleBuyProduct = async () => {
    // const router = useRouter()

    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutURL } = response.data

      
      //redirect to internal URL
        // router.push('checkout')
      //redirect to external URL
      window.location.href = checkoutURL
    } catch (error) {
      //conectar com alguma ferramente da observabilidade (Datadog, Sentry)
      alert('falha em realizar compra')
      setIsCreatingCheckoutSession(false)
    }
  }
  
  return (
    <ProductContainer>
      <ProductImage>
        <Image src={product.imgUrl} width={520} height={480} alt='' />
      </ProductImage>
      <ProductInfo>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>
        <button 
          disabled={isCreatingCheckoutSession}
          onClick={handleBuyProduct}
          >
        comprar agora</button>
      </ProductInfo>
    </ProductContainer>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params : { id: 'prod_NNgO3G8jFveDgQ'}},
    ],

    fallback: true,
  }
} 

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imgUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }  
}