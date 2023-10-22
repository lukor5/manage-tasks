<template>
  <div class="main">
    <div class="menu-container">
      <div class="top-container">
        <AddButton @toggle-popup="togglePopup"></AddButton>
        <SearchBar :tasks="filteredTasks" :category-changed="categoryChanged" @update-searched-tasks="updateSearchedTasks"></SearchBar>
      </div>
      <div class="categories-container">
        <div class="row" :class="{active: currentCategory == 'All'}">
          <i class="fa-solid fa-infinity"></i>
          <h3 @click="setActiveCategory('All')">All</h3>
        </div>
        <div class="row" :class="{active: currentCategory == 'Today'}">
          <i class="fa-regular fa-sun"></i>
          <h3 @click="setActiveCategory('Today')">Today</h3>
        </div>
        <div class="row" :class="{active: currentCategory == 'Expiring'}">
          <i class="fa-regular fa-clock"></i>
          <h3 @click="setActiveCategory('Expiring')">Expiring</h3>
        </div>
        <div class="row" :class="{active: currentCategory == 'Important'}">
          <i class="fa-regular fa-star"></i>
          <h3 @click="setActiveCategory('Important')">Important</h3>
        </div>
        <div class="row" :class="{active: currentCategory == 'Misc'}">
          <i class="fa-regular fa-face-meh"></i>
          <h3 @click="setActiveCategory('Misc')">Misc</h3>
        </div>
        <div class="row" :class="{active: currentCategory == 'Expired'}">
          <i class="fa-regular fa-trash-can"></i>
          <h3 @click="setActiveCategory('Expired')">Expired</h3>
        </div>
      </div>
    </div>
    <div class="task-pagination-wrapper">
    <div class="tasks-container">
      <div class="single-task-container" v-for="task in paginatedTasks" :key="task.id">
        <SingleTask :task="task" @delete="deleteTask"></SingleTask>
      </div>
    </div>
    <PaginationButtons
      :currentPage="currentPage"
      :tasksPerPage="tasksPerPage"
      :totalTasks="filteredSearchedTasks.length"
      @page-change="changePage"
    />
    <AddPopup :is-popup-visible="isPopupVisible" @close="closePopup" @added="getTasks"></AddPopup>
  </div>
</div>
</template>

<script>

import AddButton from './components/AddButton.vue'
import SearchBar from './components/SearchBar.vue'
import AddPopup from './components/AddPopup.vue'
import SingleTask from './components/SingleTask.vue'
import PaginationButtons from './components/PaginationButtons.vue'
import { collection, getDocs } from "firebase/firestore"
// the firestore instance
import db from './firebase/init.js'

export default {
  name: 'App',
  components: {
    AddButton,
    SearchBar,
    AddPopup,
    SingleTask,
    PaginationButtons,
  },
  data() {
    return {
      isPopupVisible: false,
      tasks: [],
      filteredTasks: [],
      filteredSearchedTasks: [],
      current: "",
      properStringDate: "",
      currentCategory: "",
      currentPage: 1, 
      tasksPerPage: 8, 
      categoryChanged: false
    };
  },

  mounted() {
    this.getStringDate();
    this.getTasks();
  },
  computed: {
    paginatedTasks() {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    const endIndex = startIndex + this.tasksPerPage;
    return this.filteredSearchedTasks.slice(startIndex, endIndex);
  },
},

  methods: {

    setActiveCategory(category) {
      this.currentCategory = category;
      this.categoryChanged = !this.categoryChanged;
      switch (category) {
        case 'All':
        this.filteredTasks = this.tasks.filter(task => task.date >= this.properStringDate);
          break;
        case 'Today':
          this.getTodayTasks();
          break;
        case 'Expiring':
          this.getExpiringTasks();
          break;
        case 'Important':
          this.getImportantTasks();
          break;
        case 'Misc':
          this.getMiscTasks();
          break;
        case 'Expired':
          this.getExpiredTasks();
          break;
      }
      
    },
    updateSearchedTasks(searchedTasks) {
      this.filteredSearchedTasks = searchedTasks;
    },

    getStringDate() {
      this.current = new Date();
      this.properStringDate = `${this.current.getFullYear()}-${this.current.getMonth() + 1}-${this.current.getDate()}`;

    },
    togglePopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    deleteTask(taskId) {
      this.filteredSearchedTasks = this.tasks.filter(task => task.id !== taskId);
      this.filteredTasks = this.tasks.filter(task => task.id !== taskId);
      this.tasks = this.filteredTasks;
    },
    getImportantTasks() {
      this.filteredTasks = this.tasks;
      this.filteredTasks = this.tasks.filter(task => task.importance === true);
    },
    getMiscTasks() {
      this.filteredTasks = this.tasks;
      this.filteredTasks = this.tasks.filter(task => task.importance !== true);
    },
    getExpiringTasks() {
      this.filteredTasks = this.tasks;
      const tomorrowDate = `${this.current.getFullYear()}-${this.current.getMonth() + 1}-${this.current.getDate() + 1}`;
      this.filteredTasks = this.tasks.filter(task => task.date === this.properStringDate || task.date === tomorrowDate);
      console.log(tomorrowDate);
    },
    getTodayTasks() {
      this.filteredTasks = this.tasks;
      this.filteredTasks = this.tasks.filter(task => task.date === this.properStringDate)
    },

    getExpiredTasks() {
      this.filteredTasks = this.tasks;
      this.filteredTasks = this.tasks.filter(task => task.date < this.properStringDate)
    },

    changePage(newPage) {
      this.currentPage = newPage;
    },

    async getTasks() {
      const colRef = collection(db, 'tasks');
      try {
        const querySnapshot = await getDocs(colRef);
        this.tasks = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        this.filteredTasks = this.tasks.filter(task => task.date >= this.properStringDate);
        this.filteredSearchedTasks = this.filteredTasks;
        console.log('Succesfully retrieved data', this.tasks);
      } catch (error) {
        console.error('error fetching data', error);
      }
    }
  },
  watch: {
    filteredSearchedTasks: {
      handler() {
        this.$nextTick(() => {
          this.paginatedTasks; 
        });
      },
      deep: true,
    },
  },
}
</script>

<style>
body {
  margin: 10px;
  font-size: 1.5em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.main {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.menu-container {
  display: flex;
  flex-direction: column;
}

.top-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.tasks-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
}

.single-task-container {
  flex: 0 21%;
  margin: 10px;
  font-size: 1em;
}

.task-pagination-wrapper {
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-inline: 20px;
  gap: 20px;
}

h3 {
  padding-right: 10px;
}

h3:hover {
  cursor: pointer;
}

.active {
  border-bottom: 2px solid orange;
  color: orange;
 
}


@media only screen and (max-width: 800px) {
  .main{
    flex-direction: column;
  }

  .categories-container {
    display: flex;
    flex-direction: row;
    font-size: 0.7em;
    flex-wrap: wrap;
    justify-content: center;
  }

  .row {
    margin-inline: 0px;
    gap: 10px;
  }

  .single-task-container {
    font-size: 0.6em;
  }

  .tasks-container {
    justify-content: center;
  }
  
}

.categories-container {}
</style>
