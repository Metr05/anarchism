<template>
    <v-row>
        <v-col
            cols="12"
            xs="12"
            sm='12'
            lg="12"
        >
        <vblockly></vblockly>
        </v-col>
    </v-row>
</template>
<script>
import vblockly from './v-blockly'
export default {
    components:{vblockly}
}
</script>