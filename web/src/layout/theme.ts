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
    bgLight: _colors.white,
    bgDark: _colors.brand.blueGray,
    primary: _colors.brand.blue,
    primaryHover: _colors.brand.blueState,
    secondary: _colors.brand.gray,
    complement: _colors.black,
    accent: _colors.grayLight,
    accentDark: _colors.grayLightDarker,
    border: _colors.gray,
    textDark: _colors.brand.gray,
    textDarkLighten: _colors.grayDark,
    textLight: _colors.white,
    textOnPrimary: _colors.white,
    textOnSecondary: _colors.white,
    disabledBg: _colors.gray,
    disabledText: _colors.grayDark,
    darkFade15: 'rgba(0, 0, 0, 0.15)',
    lightFade15: 'rgba(255, 255, 255, 0.15)',
    bgFade00: 'rgba(245, 245, 245, 0)',
    bgLightFade00: 'rgba(255, 255, 255, 0)',
    bgDarkFade00: 'rgba(20, 24, 32, 0)',
    accentDarkFade00: 'rgba(240, 240, 240, 0)',
    secondaryFade00: 'rgba(22, 22, 24, 0)',
  },
};

export default theme;
