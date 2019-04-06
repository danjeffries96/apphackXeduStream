<template>
<div id="chatbox">
    <b-list-group id="chatdisplay">
        <ChatMessage
            v-for="msg in chatMessages"
            v-bind:key="msg.id"
            v-bind:message="msg.message"
            v-bind:question="msg.question"
        ></ChatMessage>
    </b-list-group>
    <form v-on:submit="addChat" id="msg_form">
        <b-form-input id="msg_input" v-model="chat" placeholder="type your message"></b-form-input>
        <b-button v-on:click="addChat" id="msg_button">Post Message</b-button>
    </form>
</div>
</template>

<script>
//this.history.scrollTop = this.history.scrollHeight
import ChatMessage from './ChatMessage'
export default {
    name: "ChatBox",
    data: function() {
        return {
            chatMessages: [],
            cur_id: 0,
            chat: ""
        }
    },
    components: {
        ChatMessage
    },
    methods: {
        addChat() {
            var msg_obj = {
                message: this.chat,
                question: this.chat.substr(-1) === '?',
                id: this.cur_id++ 
            }
            this.chatMessages.push(msg_obj)
            var chatdisplay = document.getElementById("chatdisplay") 
            chatdisplay.scrollTop = chatdisplay.scrollHeight 
        }
    }
}
</script>

<style scoped>
    #chatbox {
        margin: 0 auto 0 auto;
        width: 25%;
    }
    form, button {
        margin-top: 15px
    }
    #chatdisplay {
        min-height: 200px;
        max-height: 200px;
        overflow-y: scroll;
    }
</style>
