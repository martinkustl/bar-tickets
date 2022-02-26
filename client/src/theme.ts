/* eslint-disable no-shadow */
import 'styled-components';

const theme = {
  colors: {
    primary: { hex: '#881c27', rgb: '136, 28, 39' },
    light: { hex: '#ffffff' },
    medium: { hex: '#5a5753' },
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

// --color-primary: #881c27;
// --color-primary-rgb: 136, 28, 39;
// --color-primary-contrast: #ffffff;
// --color-primary-contrast-rgb: 255, 255, 255;
// --color-primary-shade: #781922;
// --color-primary-tint: #94333d;

// --color-secondary: #cbbba9;
// --color-secondary-rgb: 203, 187, 169;
// --color-secondary-contrast: #000000;
// --color-secondary-contrast-rgb: 0, 0, 0;
// --color-secondary-shade: #b3a595;
// --color-secondary-tint: #d0c2b2;

// --color-tertiary: #ece7e2;
// --color-tertiary-rgb: 236, 231, 226;
// --color-tertiary-contrast: #000000;
// --color-tertiary-contrast-rgb: 0, 0, 0;
// --color-tertiary-shade: #d0cbc7;
// --color-tertiary-tint: #eee9e5;

// --color-dark: #000000;
// --color-dark-rgb: 0, 0, 0;
// --color-dark-contrast: #ffffff;
// --color-dark-contrast-rgb: 255, 255, 255;
// --color-dark-shade: #000000;
// --color-dark-tint: #1a1a1a;

// --color-medium: #5a5753;
// --color-medium-rgb: 90, 87, 83;
// --color-medium-contrast: #ffffff;
// --color-medium-contrast-rgb: 255, 255, 255;
// --color-medium-shade: #4f4d49;
// --color-medium-tint: #6b6864;

// --color-light: #ffffff;
// --color-light-rgb: 255, 255, 255;
// --color-light-contrast: #000000;
// --color-light-contrast-rgb: 0, 0, 0;
// --color-light-shade: #e0e0e0;
// --color-light-tint: #ffffff;
