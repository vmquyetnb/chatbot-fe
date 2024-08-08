<template>
    <div class="sidebar p-3 w-100">
        <div class="d-flex flex-column gap-2 px-1">
            <div class="d-flex  justify-content-between align-items-center">
                <i class="icon bi bi-window"></i>
                <i class="icon bi bi-folder-plus"></i>
            </div>
            <button class="new-chat w-100 px-2 d-flex gap-2">
                <img src="../assets/gpt.svg" alt="gpt-logo">
                <span>BotGPT</span>
            </button>
            <div class="time w-100">
                <span class="">Hôm nay</span>
                <button class="btn-chat text-start mt-2 p-1 w-100">
                    User hỏi 
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.sidebar{
    min-height: 1080px;
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
    font-size: 14px;
    background: #000;
    outline: none;
    border: none;
    border-radius: 4px;
}
.btn-chat:hover{
    background: #333;
}
</style>