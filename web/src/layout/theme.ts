const _colors = {
  black: '#000',
  white: '#fff',
  gray: '#ddd',
  grayLight: '#ececec',
  grayDark: '#757575',
  blue: '#1d61ca',
  ui: {
    greenLight: '#cdf5c8',
    redLight: '#ffd0d0',
    yellowLight: '#fff4c7',
    blueLight: '#daf7fc',
  },
  brand: {
    blue: '#161e2e',
    green: '#0effc7',
    greenDark: '#12d6a8',
    greenLight: '#d3f5ed',
  },
};

const theme = {
  color: {
    bg: _colors.white,
    primary: _colors.brand.blue,
    action: _colors.brand.green,
    actionHover: _colors.brand.greenDark,
    actionLight: _colors.brand.greenLight,
    link: _colors.blue,
    accent: _colors.grayLight,
    border: _colors.gray,
    textDark: _colors.black,
    textDarkLighten: _colors.grayDark,
    textOnPrimary: _colors.white,
    textOnPrimaryLighten: _colors.gray,
    textOnAction: _colors.brand.blue,
    disabledBg: _colors.gray,
    disabledText: _colors.grayDark,
    placeholder: "#bbb",
    ui: {
      positiveLight: _colors.ui.greenLight,
      neutralLight: _colors.ui.yellowLight,
      negativeLight: _colors.ui.redLight,
      infoLight: _colors.ui.blueLight,
    },
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
    inputHeight: '48px',
  },
};

export default theme;
