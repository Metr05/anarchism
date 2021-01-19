import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript'; // Or the generator of your choice
import * as Zhhans from 'blockly/msg/zh-hans';
import axios from 'axios'
import Ainterpreter from './Ainterpreter'
export default {
    mounted(){
        axios
            .get('./toolbox.xml')
            .then((response) => {
                var xmlText = response.data
                Blockly.setLocale(Zhhans)
                var options = { 
                    toolbox: xmlText,
                    collapse : false, 
                    comments : false, 
                    disable : false, 
                    maxBlocks : Infinity, 
                    trashcan : true, 
                    horizontalLayout : false, 
                    toolboxPosition : 'start', 
                    css : true, 
                    rtl : false, 
                    scrollbars : false, 
                    sounds : false, 
                    oneBasedIndex : true
                };
                var workspace = Blockly.inject('blocklyDiv',options);
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        
    },
    methods:{
        praseBtn: function(){
            Ainterpreter.execute("robot.forwards(robot.fast)")
        },
    },
    template: `
    <div>
        <div id="blocklyDiv" style="height:100vh;width: 100%;"></div>
        <button @click="praseBtn">123</button>
    </div>
        `
}