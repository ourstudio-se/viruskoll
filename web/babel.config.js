module.exports = (api) => {
  api.cache(true);
  const presets = [
    '@babel/react',
    ['@babel/env', {
      targets: {
        browsers: ['ie >= 11'],
      },
    }],
    '@babel/typescript',
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
    '@babel/proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
  ];

  return {
    presets,
    plugins,
  };
};
