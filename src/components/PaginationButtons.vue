<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1"><i class="bi bi-caret-left"></i></button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage * tasksPerPage >= totalTasks"><i class="bi bi-caret-right"></i></button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: Number,
      tasksPerPage: Number,
      totalTasks: Number,
    },
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.$emit("page-change", this.currentPage - 1);
        }
      },
      nextPage() {
        const maxPage = Math.ceil(this.totalTasks / this.tasksPerPage);
        if (this.currentPage < maxPage) {
          this.$emit("page-change", this.currentPage + 1);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  button {
    border-style: none;
    background-color: transparent;
  }

  button:hover {
    transform: scale(1.8);
    cursor: pointer;
  }
  </style>