/*
*   Ainterpreter is a abbr for Anarchism interpreter.It's designed for behavoir logic description , and its grammer inherit from JSX.
*   BehavoirLogicDescription has two part of system--verb system and entity system.
*   Verb system has many kinds of acts which could precisely describe any entity operation in contract. 
*   entity system contains all informations of entity , is stored as Class form.
*  Ainterpreter depends on js-interpreter(nodejs)
*/
import Interpreter from 'js-interpreter';
import $ from 'jquery'
function printf(e){
    document.getElementById('resultprint').value=document.getElementById('resultprint').value+String(e)+'\n'
    console.log(e)
}
function initFunc(interpreter, globalObject){
/*----------------------------main begin---------------------------------
*main区块里可以为三个表里面的关键字增加内容*/
function Entity(type,id,isFound,player_uuid,player_avatar){
    this.name = 'Entity'
    this.type = type;
    this.id = id;
    this.isFound = isFound;
    this.player_uuid = player_uuid[0];
    this.player_avatar = player_avatar;
    this.lists=["Saab", "Volvo", "BMW"];
}
var E;
/*----------------------------main end---------------------------------
*
*   在classtable中注册类之前，需要先声明一个interpreter假身变量
*/
//var entity = Interpreter.nativeToPseudo({});
/*
*   classtable类表.key类名，value:[globalObject,interpreter假身变量]
*   window是保留名称
*/
    const Classtable ={
        //'Entity':[globalObject,entity],
    }
/*
*   Ordertable对语法树的抽象.key是关键词,value是一个数组[class,lambda]
*   [父类(如果没有父类那么就绑定在globalObject上),(参数)=>{所执行的js代码}]
*/
    const Ordertable ={
        'printf':[globalObject,(e)=>{
            printf(e)
        }],
        'GetEntities':[globalObject,(a,b)=>{
            var isFound,player_uuid,player_avatar;
            switch(a){
                case 0:
                    $.ajax({
                        url: '/api/minecraft/'+b,
                        type:'get',
                        async: false,
                        success:function (data) {
                            var objectr = data['data']
                            if(data['success']){
                                isFound = true;
                                player_uuid = [objectr['player']['id'],objectr['player']['raw_id']]
                                player_avatar = objectr['player']['avatar']
                            }else { 
                                isFound = false
                                player_uuid = [null]
                                player_avatar = null
                            }
                            E = new Entity(a,b,isFound,player_uuid,player_avatar);
                        },
                        error:function (error) {
                            E = new Entity(a,b,false,[null],null);
                            // 请求失败之后要执行的内容
                        }
                      });
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                default:break;
            }
            return E
        }],
        'GetChild':[globalObject,(a,b)=>{
            return String(a[b])
        }]
    }
/*
*   Consttable常量表.key是关键词,value是一个数组[class,var]
*   [父类(如果没有父类那么就绑定在globalObject上),(参数)=>{可访问js常量}]
*/
    const Consttable ={
        'ENTITIES_PLAYER':[globalObject,0],
        'ENTITIES_POLITICS':[globalObject,1],
        'ENTITIES_ECONOMICS':[globalObject,2],
        'ENTITIES_LAW':[globalObject,3],
        'ENTITIES_GROUP':[globalObject,4],
        //'fast':[globalObject,robot_fast]
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
        document.getElementById('resultprint').value=''
        var myCode = String(e);
        var myInterpreter = new Interpreter(myCode, initFunc)
        try {
            myInterpreter.run()
        }catch (e) {
            document.getElementById('resultprint').value="语法错误\n"+e
        }

    }
}
