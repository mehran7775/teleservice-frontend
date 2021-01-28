module.exports = {
    configureWebpack: {
        devServer: {
            proxy: 'http://localhost:8000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                "Access-Control-Allow-Headers": "Accept,Content-Type,XMLHttpRequest,X-Authorization,X-Request-With"
            }
        }
    }
};