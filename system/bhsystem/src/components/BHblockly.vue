<template>
<div class="container">
<v-blockly></v-blockly>
</div>
</template>

<script>
import BHblockly from './BHblockly'
export default {
  components:{'v-blockly':BHblockly}
}
</script>
<style>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>