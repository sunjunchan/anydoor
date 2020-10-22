const fs = require('fs')
const path = require('path')
const Handlebars= require('handlebars')
const config = require('../config/defaultconfig')
const mime = require('./mime') //拓展名对应content-type
const compress = require('./compress') //压缩文件
const range = require('./range') //范围请求
const isFresh = require('./cache')//缓存可用时间
console.log(isFresh,'isfresh')
const promisify = require('util').promisify 
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
// require 可以使用相对路径 
const tplPath = path.join(__dirname,'../template/dir.tpl')//绝对路径
const source = fs.readFileSync(tplPath)
// const source = fs.readFileSync(tplPath,'utf-8')
// compile 接受字符串  readfile默认读出的是buf  utf-8  /  toString()
const template = Handlebars.compile(source.toString()) //模板
module.exports = async function(req,res,filePath){
    try{
        const stats = await stat(filePath) //文件信息
        if(stats.isFile()){//文件
            const contentType = mime(filePath);
            res.setHeader('Content-Type',contentType)
            // fs.createReadStream(filePath).pipe(res)

            // 返回前拦截
            if(isFresh(stats,req,res)){
                res.statusCode = 304 //新鲜的设置成304
                res.end()//不返回内容
                return
            }

            let rs
            //范围读取
            const {code,start,end} = range(stats.size,req,res) 
            if(code === 200){
                res.statusCode = 200
                rs = fs.createReadStream(filePath)
            }else{
                res.statusCode = 206
                rs = fs.createReadStream(filePath,{start,end})
            }
            //范围读取
            if(filePath.match(config.compress)){ //对符合的扩展名 进行压缩
                rs = compress(rs,req,res) //重新赋值
            }
            rs.pipe(res)
            //异步读取文件
            // fs.createReadStream(filePath,(err,data)=>{
            //     res.end(data)
            // })
        }else if(stats.isDirectory()){//文件夹
            try{
                const files = await readdir(filePath)
                res.statusCode = 200
                res.setHeader('Content-Type','text/html;charset=utf-8')
                const dir = path.relative(config.root,filePath)
                const data = {
                    title:path.basename(filePath),
                    // dir: dir?`/${dir}`:'' ,//从根路径开始
                    dir:dir,
                    files:files.map(file=>{
                        return{
                            file,
                            icon:mime(file)
                        }
                    })
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