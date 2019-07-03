<template>
  <div class="col-3 game-info">
    <h2>Game info</h2>
    <div v-if="winner == null" class="status">Next player: {{ xIsNext ? 'X' : 'O' }}</div>
    <div v-else>
      Winner: {{ winner }}
      <button type="button" @click="restartGame">Restart</button>
      </div>
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
  methods: {
    restartGame() {
      this.$emit('restartGame');
    }
  }
};
</script>
