const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'http://localhost:5017/api/BMI',
      defaultHeaders: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsIm5iZiI6MTcyNDI5NTYzNywiZXhwIjoxNzI0Mjk3NDM3LCJpYXQiOjE3MjQyOTU2Mzd9.jxJhdab8-vMtrO7-amWibbBJ7sQBFyWe-ZtxpMtjDvQ',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

    },
    
    JSONResponse: {},
  },
  include: {
    I: './steps_file.js'
  },
  name: 'CodeceptJS_API'
}