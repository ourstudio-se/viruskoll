module.exports = (api) => {
  api.cache(true);
  const presets = [
    '@babel/preset-react',
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      corejs: 3,
    }],
    '@babel/preset-typescript',
  ];

  let plugins = [];

  if (process.env.NODE_ENV === 'development') {
    plugins.push(
      [
        'babel-plugin-styled-components',
        {
          displayName: true,
          ssr: false,
        },
      ],
    );
  }

  plugins = [
    ...plugins,
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
  ];

  return {
    presets,
    plugins,
  };
};
