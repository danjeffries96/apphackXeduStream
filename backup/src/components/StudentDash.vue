<template>
    <div>
        <b-button id="reqBtn"
            v-on:click="requestAcc"
            v-bind:class="{ hidden: broadcasting }">Request Broadcast Access</b-button>
    </div>
</template>


<script>
export default {
    name: "StudentDash",
    props: ['broadcasting'],
    methods: {
        requestAcc() {
            this.$emit("requestAcc")
        }
    }
}
</script>

<style scoped>
.hidden {
    display: none
}
</style>