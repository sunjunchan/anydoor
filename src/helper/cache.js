// 缓存时间
const {cache} = require('../config/defaultconfig')
// 更新响应cache stats从中获取修改时间 修改res
function refreshRes(stats,res){
    const {maxAge, expires,cacheControl,lastModified,etag} = cache
    if(expires){ //给绝对时间，当前时间+time maxAge是秒转成毫秒*1000
        res.setHeader('Expires',new Date(Date.now()+maxAge*1000).toUTCString()) 
    }
    if(cacheControl){//静态资源的是公用的，秒数
        res.setHeader('Cache-Control',`public,max-age=${maxAge}`)
    }
    if(lastModified){//修改时间
        res.setHeader('Last-Modified',stats.mtime.toUTCString())
    }
    if(etag){//文件大小，修改时间
        res.setHeader('ETag',`${stats.size}-${stats.mtime}`)
    }
}
module.exports = function isFresh(stats,req,res){
    refreshRes(stats,res)
    const lastModified = req.headers['if-modified-since']
    const etag = req.headers['if-none-match']
    if(!lastModified&&!etag){
        // 第一次请求
        return false
    }
    //如果有客户端发来的Last-Modified与设置的不同
    if(lastModified && lastModified!==res.getHeader('Last-Modified')){
        return false
    }
    if(etag && etag!==res.getHeader('ETag')){
        return false
    }
    return true
}