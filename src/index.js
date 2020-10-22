// process.argv 读到命令行上的工具
const yargs =  require('yargs')
const argv = yargs
    .usage('anywhere [options]')
    .option('p',{
        alias:'port',
        describe:'端口号',//描述
        default:9527, //默认
    })
    .option('h',{
        alias:'hostname',
        describe:'host' 
    })
    .option('d',{
        alias:'root',
        describe:'root' 
    })
    .version()
    .alias('v','version')
    .help()
    .argv