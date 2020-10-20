const http = require('http');
const chalk = require('chalk')
const conf = require('./config/defaultconfig');
const serve = http.createServer((req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    res.end('hllow http')
})
serve.listen(conf.post,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.post}`;
    console.info(`server started at ${chalk.green(addr)}`)
})