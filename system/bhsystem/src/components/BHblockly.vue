<template>
<div>
        <v-blockly class="container" :xml_text="xml"></v-blockly>
</div>
</template>

<script>
import BHblockly from './BHblockly'
export default {
  components:{'v-blockly':BHblockly,},
  data:()=>{
    return{
      xml:'<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="WhM5aIi_vX%nI?@EB]Ch">lists</variable><variable id="gEnzhQtFb=AD|Rk2(I0m">key</variable><variable id="E}?e.vc^Cx:@$$Ud(8K@">value</variable></variables><block type="variables_set" id="2rj5jQ0uU:1)*r%k#c*}" x="120" y="142"><field name="VAR" id="WhM5aIi_vX%nI?@EB]Ch">lists</field><value name="VALUE"><block type="make_array" id="wz$}kDZCSrFpoxos$_UU"><value name="stringtoarray"><block type="get_child" id="iBmOyW^+dY,=;OOkm^aq"><value name="items"><block type="get_entities" id=")87#O;3rr~Ab~65:JW_6"><field name="ENTITIES_TYPE">ENTITIES_PLAYER</field><field name="ENTITIES_NAME">Notch</field></block></value><value name="item"><block type="entities_meta" id="$_8igSX{3|Hs1)7*-$aH"><field name="ENTITIES_OPTION">id</field></block></value></block></value></block></value><next><block type="v_foreach" id="1x^93d_Cfc5bWu`~^,;g"><field name="key" id="gEnzhQtFb=AD|Rk2(I0m">key</field><field name="value" id="E}?e.vc^Cx:@$$Ud(8K@">value</field><value name="items"><block type="variables_get" id="1+D24B$HHRgfUM(wd$zx"><field name="VAR" id="WhM5aIi_vX%nI?@EB]Ch">lists</field></block></value><statement name="do"><block type="printf" id="m(ygQCywIv!Cfd~qoRA7"><value name="Value"><block type="variables_get" id="J_;.,`%v!^5O!-Gegdl?"><field name="VAR" id="E}?e.vc^Cx:@$$Ud(8K@">value</field></block></value></block></statement></block></next></block></xml>'
    }
  }
}
</script>
<style>
.container {
  height: 90vh;
}
</style>
