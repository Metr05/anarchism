import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript'; // Or the generator of your choice
import * as Zhhans from 'blockly/msg/zh-hans';
export default {
    mounted(){
        Blockly.Blocks['string_length'] = {
            init: function() {
              this.jsonInit({
                "message0": 'length of %1',
                "args0": [
                  {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "String"
                  }
                ],
                "output": "Number",
                "colour": 160,
                "tooltip": "Returns number of letters in the provided text.",
                "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
              });
            }
          };
        Blockly.setLocale(Zhhans)
        var workspace = Blockly.inject('blocklyDiv',
        {toolbox: {
            "kind": "categoryToolbox",
            "contents": [
              {
                "kind": "category",
                "name": "Control",
                "contents": [
                  {
                    "kind": "block",
                    "type": "controls_if"
                  },
                  {
                    "kind": "block",
                    "type": "controls_whileUntil"
                  },
                  {
                    "kind": "block",
                    "type": "controls_for"
                  }
                ]
              },
              {
                "kind": "category",
                "name": "Logic",
                "contents": [
                  {
                    "kind": "block",
                    "type": "logic_compare"
                  },
                  {
                    "kind": "block",
                    "type": "logic_operation"
                  },
                  {
                    "kind": "block",
                    "type": "logic_boolean"
                  }
                ]
              }
            ]
          }});
        
    },
    template: `
    <div id="blocklyDiv" style="height: calc(100vh); width: 100%;"></div>
        `
}