<template>
    <div>
        <h1>Welcome to the Classroom</h1>
        <div id="main">
            <Canvas v-bind:broadcasting="broadcasting"
                    clientType="clientType" :canvasCallback="canvasCallback"></Canvas>
            <ChatBox></ChatBox>
            <StudentDash v-if="clientType==='student'" :broadcasting="broadcasting"></StudentDash>
            <TeacherDash v-else :broadcasting="broadcasting" :requestActive="requestActive"></TeacherDash>
        </div>
    </div>
</template>

<script>
import { TeacherNode, RTCNode }  from '../rtc.js'
import Canvas from './Canvas'
import ChatBox from './ChatBox'
import StudentDash from './StudentDash'
import TeacherDash from './TeacherDash'
export default {
    name: "Classroom",
    props: ["clientType", "canvas", "roomID", "roomName"],
    data: function() {
        return { broadcasting: false, requestActive: false}
    },
    components: {
        Canvas,
        ChatBox,
        StudentDash,
        TeacherDash
    },
    created: function() {
        this.broadcasting = this.clientType === 'teacher'
    },
    methods: {
        canvasCallback(c, v) {
            var canvas = c
            var video = v
            console.log("created room for type: ", this.clientType, canvas, video);
            if (this.clientType === "teacher") {
              this.rtc = new TeacherNode(canvas, video);
              this.rtc.socket.checkWS().then(() => {
                this.rtc.socket.sendMessage({ type: "createRoom", roomName: this.roomName });
                console.log("sent create room req", this.roomName);
              })
              .catch(err => console.log("Unable to create classroom -- ws uninitialized", err));
            }
            else if (this.clientType === "student") {
              this.rtc = new RTCNode(video);
              this.rtc.socket.checkWS().then(() => {
                this.rtc.socket.sendMessage({ 
                  type: "joinRoom",
                  roomName: this.roomID,
                })
              })
              .catch(err => console.log("Unable to join classroom -- ", err));
            }
            else {
              throw "Unknown client type: " + this.clientType;
            }
          },
    }
}
</script>