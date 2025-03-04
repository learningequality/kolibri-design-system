module.exports = {
  launch: {
    headless: true,
    timeout: 180000,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  browserContext: 'default',
};
