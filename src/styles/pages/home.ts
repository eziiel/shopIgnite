import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  // gap: '3rem',
  
  width: '100%',
  marginLeft: 'auto',
  maxWidth: 'calc(100vw - ((100vw - 1180px)/2))',
  minHeight: 656,
}) 

export const Product = styled('a', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465e4 100%);',
  borderRadius: '8px',
  cursor: 'pointer',
  // padding: '0.25rem',

  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
},

  footer:{
    position: 'absolute',
    left: '0.25rem',
    right: '0.25rem',
    bottom: '0.25rem',
    padding: '2rem',

    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 6,

    background: 'rgba(0,0,0,0.6)',

    transform:'translateY(100%)',
    transition: 'all 0.2s ease-in-out',
    opacity: 0,

    strong : {
      fontSize: '$lg',
      color: '$gray100'
    },
    
    span : {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },
    
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: '1',
    }
  },
}) 