<template>
  <div class="search-bar">
    <input ref="searchInput" @input="searchTasks" @change="searchTasks" class="search-input" placeholder="Search...">
    <i class="fa fa-search"></i> <!-- This will display the user icon -->
  </div>
</template>
  
<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchedTasks: [],
    }
  },
  computed: {
   
  },
  props: {
    tasks: Array,
    categoryChanged: Boolean
  },
  methods: {
    searchTasks() {
    if (this.$refs.searchInput ) {
      this.searchedTasks = this.task;
    const searchTerm = this.$refs.searchInput.value.toLowerCase();
    this.searchedTasks = this.tasks.filter(task => {
      if(task.task) {
      const text = task.task.toLowerCase();
      return text.includes(searchTerm);
      }
      return false;
    })
    this.$emit('update-searched-tasks', this.searchedTasks)
  }
}
},
watch: {
    categoryChanged() {
      this.searchTasks();
      
    },
  },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
i {
  font-size: 20px;
  color: rgb(133, 133, 192);
}

.search-bar {
  font-size: 16px;
}

.search-input {
  border: 2px solid rgba(211, 211, 192, 0.6);
  border-radius: 15px;
  width: 100px;
  height: 30px;
  margin-right: 10px;
}
</style>
  