<template>
    <div>
        <h1>Welcome to the Classroom</h1>
        <div id="main">
            <Canvas :canvasCallback="canvasCallback"></Canvas>
            <ChatBox></ChatBox>
            <video id="vid" width=800 height=800></video> <!-- hide if teacher -->
        </div>
    </div>
</template>

<script>
import { TeacherNode, RTCNode }  from '../rtc.js'
import Canvas from './Canvas'
import ChatBox from './ChatBox'
export default {
    name: "Classroom",
    props: ["clientType", "canvas", "roomID", "roomName"],
    components: {
        Canvas,
        ChatBox
    },
    methods: {
        canvasCallback(c) {
            canvas = c;
            this.video = document.getElementById("vid");
            console.log("created room for type: ", this.clientType, canvas, this.video);
            if (this.clientType === "teacher") {
              this.rtc = new TeacherNode(canvas, this.video);

              this.rtc.socket.checkWS().then(() => {
                this.rtc.socket.sendMessage({ type: "createRoom", roomName: this.roomName });
                console.log("sent create room req", this.roomName);
              })
              .catch(err => console.log("Unable to create classroom -- ws uninitialized", err));
            }
            else if (this.clientType === "student") {
              this.rtc = new RTCNode(this.video);
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