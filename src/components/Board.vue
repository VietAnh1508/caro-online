<template>
  <div class="col-9 game-board">
    <div class="board-row w-75 mx-auto" v-for="(row, x) in squares" :key="`row-${x}`">
      <Square
        v-for="(cell, y) in row"
        :key="`col-${y}`"
        :value="cell"
        @squareClicked="handleSquareClicked(x, y)"
      />
    </div>
  </div>
</template>

<script>
import Square from "./Square";

export default {
  components: {
    Square
  },

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
      rows: 15,
      squares: []
    };
  },

  created() {
    this.initSquares();
  },

  methods: {
    initSquares() {
      let matrix = [];
      for (let i = 0; i < this.rows; i++) {
        matrix[i] = Array(this.rows).fill(null);
      }
      this.squares = matrix;
    },

    handleSquareClicked(x, y) {
      if (!this.winner) {
        let updatedRow = this.squares[x].slice(0);

        if (this.squares[x][y] == null) {
          updatedRow[y] = this.xIsNext ? "X" : "O";
          this.$set(this.squares, x, updatedRow);

          this.$emit("playerTakeTurn");
          this.$emit("checkEndGame", {
            squares: this.squares,
            currCoordinate: { x, y }
          });
        }
      }
    },

    reset() {
      this.initSquares();
    }
  }
};
</script>

<style scoped>
.board-row:after {
  clear: both;
  content: "";
  display: table;
}
</style>
