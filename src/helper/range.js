// range 范围请求
module.exports = (totalSize,req,res)=>{
    const range = req.headers['range'];
    if(!range){
        return {code:200}; //没有返回
    }
    const sizes = range.match(/bytes=(\d*)-(\d*)/);//正则表达式取拿到的长度 匹配到数组【内容，第一个分组，第二个分组】
    const end = sizes[2] || totalSize - 1 //拿到end||拿不到end 
    const start = sizes[1] || totalSize - end
    if(start > end || start < 0 || end > totalSize){
        return {
            code: 200 
        }
    }
    // 可以返回
    res.setHeader('Accept-Ranges','bytes'),
    res.setHeader('Content-Ranges',`butes ${start}-${end}/${totalSize}`)
    res.setHeader('Content-Length',end-start)
    return{
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
}