dbPassword =
  'mongodb+srv://shuja:' +
  encodeURIComponent('shuja') +
  '@cluster0.bugz1bo.mongodb.net/?retryWrites=true&w=majority';

module.exports = {
  mongoURI: dbPassword,
};
