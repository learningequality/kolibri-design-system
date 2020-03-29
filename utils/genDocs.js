
const docGenAPI = require('vue-docgen-api')


const componentInfoPromise = docGenAPI.parse('./lib/Hello.vue')

componentInfoPromise.then(val => {
  console.log(val);
})


