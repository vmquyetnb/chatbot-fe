<template>
    <div class="container w-100 ">
        <div class="row">
            <div class="col-2 p-0 m-0">
                <SideBar />
            </div>
            <div class="col-10 p-0 m-0">
                <ChatWindow />
            </div>
        </div>
    </div>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import ChatWindow from '../views/ChatWindow.vue';
</script>

<style scoped>
.container{
    max-width: 100vw!important;
}
</style>