const http = require('http');
const conf = require('./config/defaultconfig');
const path = require('path')
const route = require('./helper/route')
const serve = http.createServer((req,res)=>{
const url = req.url
const filePath = path.join(conf.root,url)
    route(req,res,filePath);
    // fs.stat(filePath,(err,stats)=>{
    //     if(stats.isFile()){//文件
    //         res.statusCode = 200
    //         res.setHeader('Content-Type','text/plain')
    //         fs.createReadStream(filePath).pipe(res)
    //         //异步读取文件
    //         // fs.createReadStream(filePath,(err,data)=>{
    //         //     res.end(data)
    //         // })
    //     }else if(stats.isDirectory()){//文件夹
    //         fs.readdir(filePath,(err,files)=>{
    //             res.statusCode = 200
    //             res.setHeader('Content-Type','text/plain')
    //             res.end(files.join(','))
    //         })
    //     }
    // })
})
serve.listen(conf.post,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.post}`;
    console.log(addr)
})