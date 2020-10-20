const http = require('http');
const conf = require('./config/defaultconfig');
const path = require('path')
const fs = require('fs')
const serve = http.createServer((req,res)=>{
    const url = req.url
    const filePath = path.join(conf.hostname,url)
    fs.state(filePath,(err,state)=>{
        if(err){
            res.statusCode = 404
            res.setHeader('Content-Type','text/plain')
            res.end(`${filePath} is not undefind`)
        }
        if(state.isFile()){//文件
            res.statusCode = 200
            res.setHeader('Content-Type','text/plain')
            res.end(`${fs.createReadStream(filePath).pipe(res)}`)
            //异步读取文件
            // fs.createReadStream(filePath,(err,data)=>{
            //     res.end(data)
            // })
        }else if(states.isDirectory()){//文件夹
            fs.readdir(filePath,(err,files)=>{
                res.statusCode = 200
                res.setHeader('Content-Type','text/plain')
                res.end(files.join(','))
            })
        }
    })
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.end(filePath)
})
serve.listen(conf.post,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.post}`;
    console.log(addr)
})