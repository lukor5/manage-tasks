<template>
  <button class="add-button" @click="emitTogglePopup">+ Add</button>
</template>

<script>
export default {
  name: 'AddButton',
  methods: {
    emitTogglePopup() {
      this.$emit('toggle-popup');
    },

  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: rgb(133,133,192);
  width: 65px;
  height: 40px;
  
  border-style: none;
  color: white;
}

button:hover {
  cursor: pointer;
  color: black;
  background-color: white;
  border: 2px solid rgb(133,133,192);
}
</style>
