<template>
    <div class="chat-window p-3 w-100 h-100">
        <div class="h-100 w-100 d-flex flex-column justify-content-between">
            <div class="header d-flex justify-content-between">
                <span class="header-text">BotGPT</span>
                <img src="../assets/gpt.svg" alt="gpt.svg">
            </div>
            <div class="d-flex justify-content-center w-100">
                <div class="input w-100 d-flex flex-column gap-2" >
                    <div v-for="(msg,index) in messages" :key="index">
                        <div class="message d-flex flex-row-reverse" v-if="msg.sender === 'USER'">
                            <div class="user-message">
                                <p class="mb-0 text-break">{{ msg.content }}</p>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex gap-2" v-if="msg.sender === 'BOT'">
                                <img  style="width: 24px;height: max-content;" src="../assets/gpt.svg" alt="">
                                <div class="bot-message">
                                    <p class="mb-0 text-break">{{ msg.content }}</p>
                                </div>
                            </div>
                            <div class="d-flex gap-2" v-if="loading && index === messages.length - 1">
                                <img  style="width: 24px;height: max-content;" src="../assets/gpt.svg" alt="">
                                <div class="bot-message">
                                    <div class="w-100">
                                        <div class="loader"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group w-100 flex-nowrap">
                        <input type="text" class="form-control" @keydown.enter="sendMessage()" v-model="message.content" placeholder="Tin nhắn BotGPT" aria-label="Username" aria-describedby="addon-wrapping">
                        <span @click="sendMessage()" class="input-group-text" id="addon-wrapping"><i class="bi bi-send"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const loading = ref(true);
const messages = ref([]);
const conversationId = ref(1)

const message = ref({
    content: "",
});

const stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));
stompClient.debug = null;

const sendMessage = async () => {
  if (message.value.content.trim() === '') return;
  try {
    const res = await axios.post(
        'http://localhost:8080/message/send',
        { 
            content: message.value.content 
        },
        {
            headers: {
            'Content-Type': 'application/json',
            },
            params: { 
                conversationId: conversationId.value 
            },
            withCredentials: true,
        });
        loading.value = true;
        message.value.content = "";
        return res;
    } catch (error) {
        console.error('Error saving message:', error);
    }
};

const onMessageReceived = (message) => {
    const newMessage = JSON.parse(message.body);
    messages.value.push(newMessage);
    if (newMessage.sender === "BOT") {
        loading.value = false;
    }
};

onMounted(() => {
    stompClient.connect({}, (frame) => {
        stompClient.subscribe('/topic/messages', onMessageReceived);
    }, (error) => {
        console.error('Error connecting to WebSocket:', error);
    });
});

onUnmounted(() => {
    if (stompClient) {
        stompClient.disconnect();
    }
});

</script>

<style scoped>
.chat-window{
    background: #333;
    min-height: 100vh;
    color: #ffffff;
}
.header-text{
    font-weight: 600;
    font-size: 16px;
}
.header img{
    width: 32px;
}
.input{
    max-width: 768px;
}
.input-group input,.input-group span{
    font-size: 12px;
    background: #222222;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 12px 16px;
    color: #ffffff!important;
    border-radius: 24px;
}
input::placeholder {
    color: #ffffff92;
    font-size: 14px;
}
.input-group span:hover{
    cursor: pointer;
}
.user-message{
    font-size: 12px;
    padding: 12px;
    background: #222222;
    max-width: 400px;
    border-radius: 24px;
}
.bot-message{
    font-size: 12px;
    padding: 12px;
    background: #222222;
    width: max-content;
    border-radius: 24px;
}
.loader {
  width: 5px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}
@keyframes l5 {
    0%  {box-shadow: 8px 0 #fff, -8px 0 #fff2;background: #fff }
    33% {box-shadow: 8px 0 #fff, -8px 0 #fff2;background: #fff2}
    66% {box-shadow: 8px 0 #fff2,-8px 0 #fff; background: #fff2}
    100%{box-shadow: 8px 0 #fff2,-8px 0 #fff; background: #fff }
}
</style>