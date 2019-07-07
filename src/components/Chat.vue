<template>
  <button @click="sendMessage">Submit</button>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      message: "",
      count: 0
    };
  },

  sockets: {
    connect() {
      console.log("Connected to chat server");
    },
    count(val) {
      this.count = val.count;
    },
    message(data) {
      this.text += data + "\n";
    }
  },

  methods: {
    sendMessage() {
      this.$socket.emit("message", this.message);
      this.message = "";
    }
  }
};
</script>
