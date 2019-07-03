<template>
  <div class="row flex-fill d-flex justify-content-start overflow-auto pt-3">
    <Board
      ref="board"
      @playerTakeTurn="handlePlayerTakeTurn"
      @checkEndGame="handleCheckEndGame"
      :xIsNext="xIsNext"
      :winner="winner"
    />
    <GameInfo @restartGame="handleRestart" :xIsNext="xIsNext" :winner="winner" />
  </div>
</template>

<script>
import Board from "@/components/Board";
import GameInfo from "@/components/GameInfo";
import { checkEndGame } from "@/util/calculate-winner";

export default {
  components: {
    Board,
    GameInfo
  },

  data() {
    return {
      xIsNext: true,
      winner: null
    };
  },

  methods: {
    handlePlayerTakeTurn() {
      this.xIsNext = !this.xIsNext;
    },

    handleCheckEndGame(params) {
      if (checkEndGame(params)) {
        let { squares } = params;
        let { currCoordinate } = params;
        this.winner = squares[currCoordinate.x][currCoordinate.y];
      }
    },

    handleRestart() {
      this.winner = null;
      this.xIsNext = true;
      this.$refs.board.reset();
    }
  }
};
</script>
