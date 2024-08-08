<template>
    <div class="chat-window p-3 w-100">
        <div>
            <div class="header d-flex justify-content-between">
                <span class="header-text">BotGPT</span>
                <img src="../assets/gpt.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.chat-window{
    background: #333;
    min-height: 1080px;
    color: #ffffff;
}
.header-text{
    font-weight: 600;
    font-size: 16px;
}
.header img{
    width: 32px;
}
</style>