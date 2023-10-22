const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    allowedHosts: [
      'manage-tasks-ucko.onrender.com/'
    ],
  },
};