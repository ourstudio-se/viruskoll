const _colors = {
  black: '#000',
  white: '#fff',
  gray: '#ddd',
  grayLight: '#fafafa',
  grayLightDarker: '#f0f0f0',
  grayDark: '#757575',
  brand: {
    blue: '#2a78c6',
    blueState: '#145081',
    blueGray: '#141820',
    gray: '#161618',
  },
};

const theme = {
  color: {
    bg: _colors.grayLight,
    primary: _colors.brand.blue,
    primaryLight: _colors.brand.blueLight,
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
