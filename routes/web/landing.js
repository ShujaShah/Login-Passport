const LandingPage = require("./index.js");

module.exports = {
  getLandingPage: async (req, res) => {
    try {
      console.log("inside routes > web > index.js");
      let landingpage = await LandingPage.getLandingPage(req, res);
      return landingpage;
    } catch (error) {
      console.error(error);
    }
  },
};
