/* eslint-disable no-shadow */
import 'styled-components';

const theme = {
  colors: {
    primary: { hex: '#881c27', rgb: '136, 28, 39' },
    light: { hex: '#ffffff' },
    medium: { hex: '#5a5753', rgb: '90, 87, 83' },
    danger: { hex: '#ff4f4f', rgb: '255,79,79' },
    success: { hex: '#0aa246', rgb: '10, 162, 70' },
    blue: {
      hex: '#3880ff',
      rgb: '56,128,255',
    },
    dark: {
      hex: '#000000',
      rgb: '0,0,0',
    },
  },
  radius: {
    normal: '5px',
  },
};

type Theme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

export default theme;
