<template>
    <div class="chat-window p-3 w-100 h-100">
        <div class="h-100 w-100 d-flex flex-column justify-content-between">
            <div class="header d-flex justify-content-between">
                <span class="header-text">BotGPT</span>
                <img src="../assets/gpt.svg" alt="gpt.svg">
            </div>
            <div class="d-flex  w-100" >
                <div class="input w-100 d-flex flex-column gap-2" >
                    <div class="message-group d-flex flex-column align-items-center" v-if="messages.length > 0">
                        <div class="w-100 message">
                            <div v-for="(msg,index) in messages" :key="index">
                                <div class="d-flex flex-row-reverse" v-if="msg.sender === 'USER'">
                                    <div class="user-message mb-2">
                                        <p class="mb-0 text-break">{{ msg.content }}</p>
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex gap-2" v-if="msg.sender === 'BOT'">
                                        <img  style="width: 24px;height: max-content;" src="../assets/gpt.svg" alt="">
                                        <div class="bot-message mb-2">
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
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center gap-2 mb-5" v-else>
                        <img class="img-gpt" src="../assets/gpt.svg" alt="gpt.svg">
                        <p>Chào mừng bạn đã đến với BotGPT</p>
                        <p>Hỏi tôi những gì bạn muốn nhé !</p>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                        <div class="input-group w-100 flex-nowrap">
                            <input type="text" class="form-control" @keydown.enter="sendMessage()" v-model="message.content" placeholder="Tin nhắn BotGPT" aria-label="Username" aria-describedby="addon-wrapping">
                            <span @click="sendMessage()" class="input-group-text" id="addon-wrapping"><i class="bi bi-send"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted,onUpdated ,onUnmounted, watch } from 'vue';
import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useRoute } from 'vue-router';

const route = useRoute();

const loading = ref(true);
const messages = ref([]);

const message = ref({
    content: "",
});


const id = ref(route.params.id);

const getMessageByConversationId = async (conversationId) => {
    try {
        const res = await axios.get('http://localhost:8080/message/all', {
            params: { conversationId }
        });
        messages.value = res.data.output;
        loading.value = false;
    } catch (error) {
        console.error('Error fetching messages:', error);
        loading.value = false;
    }
};

watch(() => route.params.id, (newId) => {
    id.value = newId;
    getMessageByConversationId(newId);
}, { immediate: true });


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
                conversationId: id.value 
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

const stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));
stompClient.debug = null;

const onMessageReceived = (message) => {
    const newMessage = JSON.parse(message.body);
    messages.value.push(newMessage);
    if (newMessage.sender === "BOT") {
        loading.value = false;
    }
};

onMounted(() => {
    getMessageByConversationId(id.value);
    stompClient.connect({}, (frame) => {
        stompClient.subscribe('/topic/messages', onMessageReceived);
        scrollToBottom();
    }, (error) => {
        console.error('Error connecting to WebSocket:', error);
    });
});

onUpdated(() => {
  scrollToBottom();
});

const scrollToBottom = () => {
  const messageGroup = document.querySelector('.message-group');
  if (messageGroup) {
    messageGroup.scrollTop = messageGroup.scrollHeight;
  }
};

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
.message,.input-group{
    max-width: 768px;
}
.message-group{
    display: flex;
    height: 850px;
    overflow-y: scroll;
}
.message-group::-webkit-scrollbar {
  width: 8px;
  height: 5px!important;
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

.img-gpt{
    height: 50px;
}
</style>