const _colors = {
  black: '#000',
  white: '#fff',
  gray: '#ddd',
  grayLight: '#fafafa',
  grayDark: '#757575',
  brand: {
    blue: '#252f3f',
    purple: '#6875f5',
    purpleDark: '#505bcc',
  },
};
const theme = {
  color: {
    bg: _colors.grayLight,
    primary: _colors.brand.blue,
    action: _colors.brand.purple,
    actionHover: _colors.brand.purpleDark,
    border: _colors.gray,
    textDark: _colors.brand.gray,
    textDarkLighten: _colors.grayDark,
    textOnPrimary: _colors.white,
    textOnPrimaryLighten: _colors.gray,
  },
  breakpoint: {
    Sm: '@media (min-width: 600px)',
    LtSm: '@media (max-width: 599px)',
    Md: '@media (min-width: 900px)',
    LtMd: '@media (max-width: 899px)',
    Lg: '@media (min-width: 1200px)',
    LtLg: '@media (max-width: 1199px)',
  },
  distances: {
    baseUnit: '8px',
    headerHeight: '64px',
  },
};
export default theme;
