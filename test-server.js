// 简单HTTP服务器测试
const http = require("http")
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end("<h1>测试服务器</h1>")
})
server.listen(9999, () => {
    console.log("测试服务器运行在 http://localhost:9999")
})
