if(process.env.NODE_env ==='production'){
    module.exports =require('./prod'); //배포후 production 에 있을때 
}else{
    module.exports =require('./dev'); //local에 development에 있을때 
}
//process.env.NODE_env 환경변수
