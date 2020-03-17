const servor = require('servor');
(async () => {
  await servor({
    root: '.',
    fallback: 'index.html',
    port: process.env.HTTP_PORT || 8000,
    reload: false,
  });
})();
