// 压缩  文件压缩
//压缩的文件 浏览器支持的类型 使用的压缩方式
const {createGzip,createDeflate} = require('zlib')
module.exports = (rs,req,res)=>{
    const acceptEncoding = req.headers['accept-encoding'] //取浏览器支持的压缩方式
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deglate)\b/)){
        return rs;
    } //两种不支持压缩的情况，浏览器不支持压缩，拿到的没有服务器支持的.例不支持gzip|deglate
    else if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip')//使用压缩方式
        return rs.pipe(createGzip())
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate')//使用压缩方式
        return rs.pipe(createDeflate())
    }
}