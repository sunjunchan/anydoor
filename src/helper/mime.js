// 根据拓展名写正确的content-type
const path = require('path')
const mimeTypes = {
    'css':'text/css',
    'git':'image/gif',
    'html':'text/html;charset=utf-8',
    'ico':'image/x-icon',
    'jpeg':'image/jpeg',
    'jpg':'image/jpeg',
    'js':'text/javascript;charset=utf-8',
    'json':'application/json;charset=utf-8',
    'pdf':'application/pdf',
    'png':'image/png',
    'svg':'image/svg+xml',
    'swf':'application/x-shockwave-flash',
    'tiff':'image/tiff',
    'txt':'text/plain;charset=utf-8',
    'wav':'audio/x-wav',
    'wma':'audio/x-ms-wma', 
    'wmv':'video/x-ms-wmv',
    'xml':'text/xml'
}
module.exports = (filePath)=>{
    let ext = path.extname(filePath) //路径取扩展名
        .split('.') //jquery.min.js 例子取最后一个
        .pop() //最后一位
        .toLowerCase() //转小写
    if(!ext){ //没有拓展名
        ext = filePath;
    }
    return mimeTypes[ext] || mimeTypes['txt']
};