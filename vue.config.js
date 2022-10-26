module.exports = {
    devServer: {
      // 设置代理
      proxy: {
        "/gcs/api/suggest": {
          target: "https://s.scz.lu/",
          ws: false, // 是否启用websockets
          changOrigin: true, //跨域
        },
        "/": {
          target: "http://gateway:9000/",
          ws: false,
          changOrigin: true,
        }
      }
    },
    productionSourceMap: false
}