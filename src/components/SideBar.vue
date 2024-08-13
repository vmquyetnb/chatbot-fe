<template>
    <div class="sidebar p-3 w-100">
        <div class="d-flex flex-column gap-2 px-1">
            <div class="d-flex  justify-content-between align-items-center">
                <i class="icon bi bi-window" @click="addConversation()" ></i>
                <i class="icon bi bi-folder-plus" @click="addConversation()" ></i>
            </div>
            <button class="new-chat w-100 px-2 d-flex gap-2" @click="addConversation()">
                <img src="../assets/gpt.svg" alt="gpt-logo">
                <span>BotGPT</span>
            </button>
            <div class="time w-100">
                <span class="ms-1">Hôm nay</span>
                <div v-for="conversation in listConversation">
                    <button class="btn-chat text-start mt-2 p-1 w-100">
                        {{ conversation.title }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const conversation = ref({
    title : "New Chat"
})

const listConversation = ref([]);

const getConversation = async () => {
    const res = await axios.get('http://localhost:8080/conversation')
    listConversation.value = res.data.output;
    console.log(res.data.output);
    return res;
}

const addConversation = async () => {
    const res = await axios.post('http://localhost:8080/conversation/add',conversation.value);
    getConversation();
    return res;
}
getConversation();
</script>

<style scoped>
.sidebar{
    min-height: 100vh;
    background: #000;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
}
.icon{
    font-size: 20px;
    padding: 4px 10px;
    border-radius: 4px;
}
.icon:hover{
    background: #333;
    cursor: pointer;
}
.new-chat img{
    width: 20px;
}
.new-chat{
    font-size: 14px;
    background: #000;
    outline: none;
    border: none;
    border-radius: 4px;
}
.new-chat:hover{
    background: #333;
}
.btn-chat{
    font-weight: normal;
    font-size: 12px;
    background: #000;
    outline: none;
    border: none;
    border-radius: 4px;
}
.btn-chat:hover{
    background: #333;
}
</style>