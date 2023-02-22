import { createStitches } from "@stitches/react";

export const { 
  config, 
  theme, 
  createTheme,
  styled, 
  globalCss, 
  keyframes,
  getCssText,
  css
 } = createStitches({
  theme : {
    colors: {
      withe: '#fff',

      gray900: '#121214',
      gray800: '#202024',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00B37E',
    },

    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    }
  }
})