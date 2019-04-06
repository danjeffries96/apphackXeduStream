<template>
    <div>
        <h1>Welcome to the Classroom</h1>
        <div id="main">
            <Canvas :canvasCallback="canvasCallback"></Canvas>
            <ChatBox></ChatBox>
        </div>
    </div>
</template>

<script>
import Canvas from './Canvas'
import ChatBox from './ChatBox'
export default {
    name: "Classroom",
    components: {
        Canvas,
        ChatBox
    },
    methods: {
        canvasCallback(c) {
            console.log(c)
        }
    }
}
</script>