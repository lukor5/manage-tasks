<template>
    <div :class="['task-container', {'important-task' : task.importance}]">
        <div class="task-top-container">
        <p>{{ task.date }}</p><p>{{ task.important }}</p><i class="bi bi-x" @click="showConfirmation = true"></i>
        </div>
        <div class="task-text-container">
            <p>{{ task.task }}</p>
        </div>
        <div class="confirmation-container" v-if="showConfirmation">
            <div class="confirmation-wrapper">
            <p>Are you sure you want to delete?</p>
            <button @click="deleteTask">Yes</button>
            <button @click="showConfirmation = false">No</button>
        </div>
        </div>
    </div>
</template>

<script>
    import { doc, deleteDoc } from "firebase/firestore";
    import db from '../firebase/init.js'
    export default {
        name: 'SingleTask',
        props: {
        task: Object,
    },
    data() {
        return {
            textValue: '',
            dateValue: '',
            isImportant: false,
            showConfirmation: false
        }
    },
    methods: {
        async deleteTask() {
            const docRef = doc(db, 'tasks', this.task.id)
            await deleteDoc(docRef)
            this.$emit('delete', this.task.id)
        }



    }

    }


</script>

<style scoped>
.task-container {
    display: flex;
    flex-direction: column;
    background-color: rgba(90, 84, 84, 0.1);
    border-radius: 20px;
    padding: 20px;
    margin-inline: 20px;
    position: relative;
}
.task-top-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


.confirmation-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  backdrop-filter: blur(2px);
  background-color: rgba(44, 41, 41, 0.4);
  border-radius: 20px;
  color: white;
}

.confirmation-wrapper {
    padding: 10px;
}

.confirmation-wrapper button {
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    background-color: rgba(255,255,255,0.5);
    color: black
}

.confirmation-wrapper button:hover {
    cursor: pointer;
    color: white;
    background-color: rgba(255,255,255,0.2);
}

.important-task {
    background-color: rgb(233, 211, 14, 0.5);
}

i:hover {
    color: red;
    cursor: pointer;
}

</style>