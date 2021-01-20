module.exports = {
    runtimeCompiler: true,
    devServer: {
        proxy: {
            '/api/minecraft': {
              target: 'https://playerdb.co/api/player/minecraft',
              changeOrigin: true
            }
          }
    }
}