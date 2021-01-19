/*
*   Ainterpreter is a abbr for Anarchism interpreter.It's designed for behavoir logic description , and its grammer inherit from JSX.
*   BehavoirLogicDescription has two part of system--verb system and entity system.
*   Verb system has many kinds of acts which could precisely describe any entity operation in contract. 
*   entity system contains all informations of entity , is stored as Class form.
*  Ainterpreter depends on js-interpreter(nodejs)
*/
import Interpreter from 'js-interpreter';
function initFunc(interpreter, globalObject){
/*----------------------------main begin---------------------------------
*main区块里可以为三个表里面的关键字增加内容*/

var robot_fast = 99//robot.fast

/*----------------------------main end---------------------------------
*
*   在classtable中注册类之前，需要先生命一个interpreter假身变量
*/
var robot = interpreter.nativeToPseudo({});
/*
*   classtable类表.key类名，value:[globalObject,interpreter假身变量]
*/
    const Classtable ={
        'robot':[globalObject,robot],
    }
/*
*   Ordertable对语法树的抽象.key是关键词,value是一个数组[class,lambda]
*   [父类(如果没有父类那么就绑定在globalObject上),(参数)=>{所执行的js代码}]
*/
    const Ordertable ={
        'printf':[globalObject,(e)=>{
            console.log(e)
        }],
        'forwards':[robot,(e)=>{
            console.log(e)
        }]
    }
/*
*   Consttable常量表.key是关键词,value是一个数组[class,var]
*   [父类(如果没有父类那么就绑定在globalObject上),(参数)=>{可访问js常量}]
*/
    const Consttable ={
        'url':[globalObject,String(location)],
        'fast':[robot,robot_fast]
    }
//----------------------------------------------------------------------//
    for(var classs in Classtable){
        interpreter.setProperty(Classtable[classs][0], classs, Classtable[classs][1]);
    }
    for(var order in Ordertable){
        interpreter.setProperty(Ordertable[order][0], order,interpreter.createNativeFunction(Ordertable[order][1]));
    }
    for(var constt in Consttable){
        interpreter.setProperty(Consttable[constt][0],constt,Consttable[constt][1]);
    }
}
export default {
    execute:(e)=>{
        var myCode = String(e);
        var myInterpreter = new Interpreter(myCode, initFunc)
        myInterpreter.run()
    }
}
