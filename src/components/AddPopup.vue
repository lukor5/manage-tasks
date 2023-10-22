<template>
    <div v-if="isPopupVisible" class="popup-overlay">
        <div class="popup">
            <button @click="emitClosePopup" style="align-self:flex-end;"><i class="fa-solid fa-x"
                    style="color: #000000;"></i></button>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <input type="text" id="text" placeholder="Task ..." v-model="textValue" required />
                    <button @click="setImportance"><i :style="{color : isImportant ? 'orange' :'inherit'}" class="bi bi-star-fill"></i></button>
                </div>
                <div class="form-group">
                    <input type="date" id="date" v-model="dateValue" required />
                </div>
                <button @click="postTask" type="submit" :disabled="!canSubmit">Submit</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import { collection, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'
export default {
    name: 'AddPopup',
    props: {
        isPopupVisible: Boolean,
    },
    data() {
        return {
            textValue: '',
            dateValue: '',
            isImportant: false
        };
    },
    computed: {
        canSubmit() {
            return this.textValue !== '' && this.dateValue !== '';
        },
    },
    methods: {
        emitClosePopup() {
            this.$emit('close');
            this.textValue = '';
            this.dateValue = '';
            this.isImportant = false;
        },

        async postTask() {
            const colRef = collection(db, 'tasks')
            const dataObj = {
                task: this.textValue,
                date: this.dateValue,
                importance: this.isImportant
            }
            const docRef = await addDoc(colRef, dataObj)
            this.emitClosePopup();
            this.$emit('added');

            // access auto-generated ID with '.id'
            console.log('Document was created with ID:', docRef.id)
        },

        setImportance() {
            this.isImportant = !this.isImportant;
          
        }


    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

.popup {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 20px;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
}

.form-group {
    padding: 20px;
}

button {
    border: none;
}

button:hover {
    transform: scale(1.2);
    cursor: pointer;
}

#text {
    height: 30px;
}

input {
    border: none;
    border-bottom: 1px solid rgb(151, 143, 143);
}
</style>
  