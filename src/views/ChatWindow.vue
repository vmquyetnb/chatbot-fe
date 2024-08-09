<template>
    <div class="chat-window p-3 w-100 h-100">
        <div class="h-100 w-100 d-flex flex-column justify-content-between">
            <div class="header d-flex justify-content-between">
                <span class="header-text">BotGPT</span>
                <img src="../assets/gpt.svg" alt="gpt.svg">
            </div>
            <div class="d-flex justify-content-center w-100">
                <div class="input w-100 d-flex flex-column gap-2">
                    <div class="message d-flex flex-row-reverse">
                        <div class="user-message">
                            <p class="mb-0 text-break">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <img  style="width: 24px;height: max-content;" src="../assets/gpt.svg" alt="">
                        <div class="bot-message">
                            <p class="mb-0 text-break">bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>
                        </div>
                    </div>
                    <div class="input-group w-100 flex-nowrap">
                        <input type="text" class="form-control" placeholder="Tin nhắn BotGPT" aria-label="Username" aria-describedby="addon-wrapping">
                        <span class="input-group-text" id="addon-wrapping"><i class="bi bi-send"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.chat-window{
    background: #333;
    min-height: 934px;
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
</style>