<template>
    <div class="mainblock">
    <div class="header">
        <b-nav pills>
          <b-nav-item v-on:click="activeTab=1" v-bind:active="activeTab === 1">Teacher</b-nav-item>
          <b-nav-item v-on:click="activeTab=2" v-bind:active="activeTab === 2">Student</b-nav-item>
        </b-nav>
    </div>
    <form v-if="activeTab === 1" id="createRoom">
      <b-form-input id="roomName" v-model="text" placeholder="Classroom Name"></b-form-input>
      <b-button id="submit">Create Classroom!</b-button>
    </form>
    <form v-else id="joinRoom">
      <b-form-input id="roomID" v-model="text" placeholder="Classroom ID"></b-form-input>
      <b-button id="submit">Join Room</b-button>
    </form>
    </div>
</template>

<script>
export default {
  name: 'SplashForm',
  data: function()  {
    return { activeTab : 1 };
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
