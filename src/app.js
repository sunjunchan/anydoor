const http = require('http');
const conf = require('./config/defaultconfig');
const serve = http.createServer((req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<body>')
    res.write('hllow http!')
    res.write('</body>')
    res.write('</html>')
    res.end()
})
serve.listen(conf.post,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.post}`;
    console.log(addr)
})