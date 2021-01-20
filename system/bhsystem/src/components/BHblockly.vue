<template>
<v-blockly class="container"></v-blockly>
</template>

<script>
import BHblockly from './BHblockly'
export default {
  components:{'v-blockly':BHblockly}
}
</script>
<style>
.container {
  height: 90vh;
}
</style>