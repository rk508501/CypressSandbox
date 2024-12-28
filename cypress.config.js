const { defineConfig } = require("cypress");
const axios = require('axios')

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
     let entities = await axios.get("https://isro.vercel.app/api/spacecrafts");
     config.env.entities = entities.data

     return config;
    },
  },
});



