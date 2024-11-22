const { defineConfig } = require("cypress");
const axios = require('axios')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        getEntities() {
          return new Promise((resolve, reject)=>{
            axios.get("https://isro.vercel.app/api/spacecrafts").then(resp => {
              console.log(JSON.stringify(resp.data))
              resolve(resp.data)
              reject(null)
            })
          })
        },
      })
    },
  },
});
