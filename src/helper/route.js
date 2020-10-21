const fs = require('fs')
const path = require('path')
const Handlebars= require('handlebars')
const config = require('../config/defaultconfig')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
// require 可以使用相对路径 
const tplPath = path.join(__dirname,'../template/dir.tpl')//绝对路径
const source = fs.readFileSync(tplPath)
// const source = fs.readFileSync(tplPath,'utf-8')
// compile 接受字符串  readfile默认读出的是buf  utf-8  /  toString()
const template = Handlebars.compile(source.toString())
module.exports = async function(req,res,filePath){
    try{
        const stats = await stat(filePath)
        if(stats.isFile()){//文件
            res.statusCode = 200
            res.setHeader('Content-Type','text/plain')
            fs.createReadStream(filePath).pipe(res)
            //异步读取文件
            // fs.createReadStream(filePath,(err,data)=>{
            //     res.end(data)
            // })
        }else if(stats.isDirectory()){//文件夹
            try{
                const files = await readdir(filePath)
                res.statusCode = 200
                res.setHeader('Content-Type','text/html')
                const dir = path.relative(config.root,filePath)
                const data = {
                    title:path.basename(filePath),
                    // dir: dir?`/${dir}`:'' ,//从根路径开始
                    dir:dir,
                    files
                }
                res.end(template(data))
            }catch(ex){
                console.log(ex)
            }
            // fs.readdir(filePath,(err,files)=>{
            //     res.statusCode = 200
            //     res.setHeader('Content-Type','text/plain')
            //     res.end(files.join(','))
            // })
        }
    }catch(ex){
        console.log(ex);
        res.statusCode = 404
        res.setHeader('Content-Type','text/plain')
        res.end(`${filePath} is not undefind or file\n ${ex.toString()}`)
    }
}