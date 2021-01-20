import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript'; // Or the generator of your choice
import * as Zhhans from 'blockly/msg/zh-hans';
import axios from 'axios'
import $ from 'jquery'
import Ainterpreter from './Ainterpreter'
export default {
    props:{
        xml_text:null
    },
    mounted(){
        axios
            .get('./toolbox.xml')
            .then((response) => {
                Blockly.Blocks['make_array'] = {
                    init: function() {
                      this.appendValueInput("stringtoarray")
                          .setCheck("String")
                          .appendField("制表");
                      this.setInputsInline(false);
                      this.setOutput(true, "Array");
                      this.setColour(230);
                   this.setTooltip("将实体子数据转换成列表");
                   this.setHelpUrl("");
                    }
                  };
                Blockly.Blocks['entities_meta'] = {
                    init: function() {
                      this.appendDummyInput()
                          .appendField(new Blockly.FieldDropdown([["ID","id"], ["type","type"], ["isFound","isFound"], ["UUID","player_uuid"], ["Avatar","player_avatar"], ["Lists","lists"]]), "ENTITIES_OPTION");
                      this.setOutput(true, "entities_meta");
                      this.setColour(230);
                   this.setTooltip("实体元素名");
                   this.setHelpUrl("");
                    }
                  };
                Blockly.Blocks['v_foreach'] = {
                    init: function() {
                      this.appendValueInput("items")
                          .setCheck("Array")
                          .appendField("为表");
                      this.appendDummyInput()
                          .appendField("中的每一对")
                          .appendField(new Blockly.FieldVariable("key"), "key")
                          .appendField(new Blockly.FieldVariable("value"), "value");
                      this.appendStatementInput("do")
                          .setCheck(null)
                          .appendField("进行");
                      this.setInputsInline(true);
                      this.setPreviousStatement(true, null);
                      this.setNextStatement(true, null);
                      this.setColour(160);
                   this.setTooltip("元素遍历");
                   this.setHelpUrl("");
                    }
                  };
                  Blockly.Blocks['get_child'] = {
                    init: function() {
                      this.appendValueInput("items")
                          .setCheck("entities")
                          .appendField("获取对象");
                      this.appendValueInput("item")
                          .setCheck("entities_meta")
                          .appendField("中的");
                      this.setInputsInline(true);
                      this.setOutput(true, null);
                      this.setColour(230);
                   this.setTooltip("获取子元素");
                   this.setHelpUrl("");
                    }
                  };
                Blockly.Blocks['get_entities'] = {
                    init: function() {
                      this.appendDummyInput()
                          .appendField("实体")
                          .appendField(new Blockly.FieldDropdown([["玩家实体","ENTITIES_PLAYER"], ["政治实体","ENTITIES_POLITICS"], ["经济实体","ENTITIES_ECONOMICS"], ["法律实体","ENTITIES_LAW"], ["注册群体","ENTITIES_GROUP"]]), "ENTITIES_TYPE")
                          .appendField("ID")
                          .appendField(new Blockly.FieldTextInput("Notch"), "ENTITIES_NAME");
                      this.setInputsInline(true);
                      this.setOutput(true, "entities");
                      this.setColour(230);
                   this.setTooltip("获取实体数据");
                   this.setHelpUrl("");
                    }
                  };
                Blockly.Blocks['printf'] = {
                    init: function() {
                      this.appendValueInput("Value")
                          .setCheck(null)
                          .appendField('输出');
                      this.setPreviousStatement(true, null);
                      this.setColour(160);
                   this.setTooltip("打印点什么东西到控制台");
                   this.setHelpUrl("");
                    }
                  };
                  Blockly.JavaScript['make_array'] = function(block) {
                    var value_stringtoarray = Blockly.JavaScript.valueToCode(block, 'stringtoarray', Blockly.JavaScript.ORDER_ATOMIC);
                    // TODO: Assemble JavaScript into code variable.
                    var code = value_stringtoarray+'.split(\u0022,\u0022)';
                    // TODO: Change ORDER_NONE to the correct strength.
                    return [code, Blockly.JavaScript.ORDER_NONE];
                  };
                  Blockly.JavaScript['entities_meta'] = function(block) {
                    var dropdown_entities_option = block.getFieldValue('ENTITIES_OPTION');
                    // TODO: Assemble JavaScript into code variable.
                    var code = "'"+String(dropdown_entities_option)+"'";
                    // TODO: Change ORDER_NONE to the correct strength.
                    return [code, Blockly.JavaScript.ORDER_NONE];
                  };
                  Blockly.JavaScript['v_foreach'] = function(block) {
                    var value_items = Blockly.JavaScript.valueToCode(block, 'items', Blockly.JavaScript.ORDER_ATOMIC);
                    var variable_key = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('key'), Blockly.Variables.NAME_TYPE);
                    var variable_value = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('value'), Blockly.Variables.NAME_TYPE);
                    var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
                    // TODO: Assemble JavaScript into code variable.
                    var code = 'for(key in '+value_items+'){value='+value_items+'[key];'+statements_do+'};\n';
                    return code;
                  };
                  Blockly.JavaScript['get_child'] = function(block) {
                    var value_items = Blockly.JavaScript.valueToCode(block, 'items', Blockly.JavaScript.ORDER_ATOMIC);
                    var value_item = Blockly.JavaScript.valueToCode(block, 'item', Blockly.JavaScript.ORDER_ATOMIC);
                    // TODO: Assemble JavaScript into code variable.
                    var code = 'GetChild('+value_items+','+value_item+')';
                    // TODO: Change ORDER_NONE to the correct strength.
                    return [code, Blockly.JavaScript.ORDER_NONE];
                  };
                  Blockly.JavaScript['printf'] = function(block) {
                    var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC);
                    // TODO: Assemble JavaScript into code variable.
                    var code = 'printf('+value_value+');\n';
                    return code;
                  };
                  Blockly.JavaScript['get_entities'] = function(block) {
                    var dropdown_entities_type = block.getFieldValue('ENTITIES_TYPE');
                    var text_entities_name = block.getFieldValue('ENTITIES_NAME');
                    // TODO: Assemble JavaScript into code variable.
                    var code = 'GetEntities('+dropdown_entities_type+',\u0022'+text_entities_name+'\u0022)'
                    // TODO: Change ORDER_NONE to the correct strength.
                    return [code, Blockly.JavaScript.ORDER_NONE];
                  };
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
                var xml = (xmlText!=null)?(Blockly.Xml.textToDom(this.xml_text)):null;
                (xml!=null)?(Blockly.Xml.domToWorkspace(xml, workspace)):null;
                var codedata;
                workspace.addChangeListener((event)=>{
                    var code = Blockly.JavaScript.workspaceToCode(workspace);
                    document.getElementById('codeprint').value = code;
                    var xml = Blockly.Xml.workspaceToDom(workspace);
                    var xml_text = Blockly.Xml.domToText(xml);
                    codedata = xml_text;
                  });
                  $('#exportBtn').on('click',()=>{
                    console.log(codedata)
                  })
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        
    },
    methods:{
        praseBtn: function(){
            Ainterpreter.execute(document.getElementById('codeprint').value)
        },
    },
    template: `
    <div>
        <div id="blocklyDiv" style="float:left;height:50%;width: 100%;"></div>
        <div style="float:left;width: 100%;">
        <div style="float:left;width:50%;height:50vh"><textarea disabled placeholder="代码" id="codeprint" style="height:100%;width: 100%;"></textarea></div>
        <div style="float:left;width:50%;height:50vh"><textarea disabled placeholder="结果" id="resultprint" style="height:100%;width: 100%;"></textarea></div>
        <button  @click="praseBtn">运行</button>
        <button id="exportBtn">导出</button>
        </div>
    </div>
        `
}