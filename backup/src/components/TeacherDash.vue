<template>
    <div>
        <b-button id="resumeCast" v-bind:class="{ hidden: broadcasting }">Become Broadcaster</b-button>
        <div id="reqdiv" v-bind:class="{ hidden: !requestActive }">
            <label class="request">Request: {{reqMsg}}</label>
            <b-button v-on:click="grantReq" id="grantReq">Grant Request</b-button>
        </div>
    </div>
</template>


<script>
export default {
    name: "TeacherDash",
    props: ['broadcasting', 'requestActive', 'reqMsg'],
    methods: function() {
        this.$emit('grantReq')
    }
}
</script>

<style scoped>
.hidden {
    display: none
}
</style>