<template>
    <div class="mainblock">
    <div v-if="roomCreated" id="gotoRoom">
      <h3>Room successfully created. URL:</h3>
      <a v-bind:href="room_url">{{room_url}}</a>
    </div>
    <div v-else>
      <div class="header">
          <b-nav pills>
            <b-nav-item v-on:click="activeTab=1" v-bind:active="activeTab === 1">Teacher</b-nav-item>
            <b-nav-item v-on:click="activeTab=2" v-bind:active="activeTab === 2">Student</b-nav-item>
          </b-nav>
      </div>
          <form v-if="activeTab === 1" id="createRoom">
        <b-form-input id="roomName" v-model="roomName" placeholder="Classroom Name"></b-form-input>
        <b-button v-on:click="createRoom" id="submit">Create Classroom!</b-button> 
      </form>
      <form v-else id="joinRoom">
        <b-form-input id="roomID" v-model="roomID" placeholder="Classroom ID"></b-form-input>
        <b-button v-on:click="joinRoom" id="submit">Join Room</b-button>
      </form>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
import { TeacherNode, RTCNode }  from '../rtc.js'
import '../jquery-3.3.1.min.js'

// tab numbers
const TEACHER = 1;
const STUDENT = 2;

// roomID used for joining
// roomName used for creating

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses JSON response into native Javascript objects 
    .catch(err => console.log("error with response from fetch"));
} 

export default {
  name: 'SplashForm',
  data: function()  {
    return { 
      roomName: "",
      roomID: "",
      roomCreated: false,
      room_url: "",
      activeTab : 1 ,
      };
  },
  methods: {
    createRoom: function() {
      postData("/queryRoom", { roomName: this.roomName });
      this.$emit('clientType', 'teacher');
      this.$emit('roomName', this.roomName);
    },
    joinRoom: function() {
      this.$emit('clientType', 'student');
      this.$emit('roomID', this.roomID);
    }
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainblock {
  /*text-align: center;*/
  margin: 0 auto 0 auto;
  width: 50%;
}
</style>
