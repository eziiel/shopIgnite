import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3rem',

  height: 656,  
  margin: '0 auto',
  
  h1: {
    fontSize: '$xxl',
    color: '$gray100',
  },
  
  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '1rem',
    lineHeight: 1.4,
  },

  a:{
    color: '$green500',
    display: 'block',
    marginTop: '4rem',
    fontSize: '$lg',
    textDecoration: 'none',
    fontWeight: 'bold',
    
    '&:hover': {
      color: '$green300',
    }
  }
})

export const SuccessImage = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465e4 100%);',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '3rem',

  img: {
    objectFit: 'cover',
  }
}) 
