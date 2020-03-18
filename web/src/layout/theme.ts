const _colors = {
  black: '#000',
  white: '#fff',
  gray: '#ddd',
  grayLight: '#fafafa',
  grayDark: '#757575',
  brand: {
    blue: '#161e2e',
    blueLight: '#e9f2ff',
    green: '#0effc7',
    greenDark: '#12d6a8',
    greenLight: '#d3f5ed',
  },
};
const theme = {
  color: {
    bg: _colors.white,
    primary: _colors.brand.blue,
    primaryLight: _colors.brand.blueLight,
    action: _colors.brand.green,
    actionHover: _colors.brand.greenDark,
    actionLight: _colors.brand.greenLight,
    border: _colors.gray,
    textDark: _colors.black,
    textDarkLighten: _colors.grayDark,
    textOnPrimary: _colors.white,
    textOnPrimaryLighten: _colors.gray,
    textOnAction: _colors.brand.blue,
  },
  breakpoint: {
    Sm: '@media (min-width: 600px)',
    LtSm: '@media (max-width: 599px)',
    Md: '@media (min-width: 900px)',
    LtMd: '@media (max-width: 899px)',
    Lg: '@media (min-width: 1200px)',
    LtLg: '@media (max-width: 1199px)',
  },
  font: "'Lato', sans-serif",
  distances: {
    baseUnit: '8px',
    headerHeight: '64px',
  },
};
export default theme;
