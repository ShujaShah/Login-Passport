dbPassword =
  "mongodb+srv://shuja:" +
  encodeURIComponent("shuja") +
  "@cluster0.ndy1scg.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  mongoURI: dbPassword,
};
