<template>
  <div class="col-3 game-info">
    <h2>Game info</h2>
    <div v-if="winner == null" class="status">Next player: {{ xIsNext ? 'X' : 'O' }}</div>
    <div v-else>
      Winner: {{ winner }}
      <button type="button" @click="newGame">New game</button>
    </div>
    <span>Username: {{ username }}</span>
    <button type="button" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  props: {
    xIsNext: {
      type: Boolean
    },
    winner: {
      type: String
    }
  },

  data() {
    return {
      username: ""
    };
  },

  created() {
    this.username = localStorage.getItem("username");
  },

  methods: {
    newGame() {
      this.$socket.emit("newGame", this.xIsNext);
    },

    logout() {
      this.$socket.emit("logout", { id: localStorage.getItem("id") }, () => {
        localStorage.clear();
        this.$router.replace({ name: "login" });
      });
    }
  }
};
</script>
