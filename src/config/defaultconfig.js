module.exports={
    hostname:'127.0.0.1',
    post:9527,
    root:process.cwd(),//用户当前的文件夹
    compress:/\.(html|js|css|md)/, //压缩
    cache:{
        maxAge: 600, //十分钟内有效，600秒
        expires: true, //是否支持expires ，默认都是打开
        cacheControl: true, //是否支持
        lastModified: true, //是否支持
        etag: true //是否支持
    }//服务器的支持情况
}