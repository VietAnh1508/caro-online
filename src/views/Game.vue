<template>
  <div class="row flex-fill d-flex justify-content-start overflow-auto pt-3">
    <Board ref="board" @checkEndGame="handleCheckEndGame" :xIsNext="xIsNext" :winner="winner" />
    <GameInfo :xIsNext="xIsNext" :winner="winner" />
  </div>
</template>

<script>
import Board from "@/components/Board";
import GameInfo from "@/components/GameInfo";
import { haveWinner } from "@/util/find-winner";

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
    handleCheckEndGame(params) {
      if (haveWinner(params)) {
        let { squares } = params;
        let { currCoordinate } = params;
        this.winner = squares[currCoordinate.x][currCoordinate.y];
      }
    }
  },

  sockets: {
    playerTakeTurn(data) {
      this.xIsNext = data.xIsNext;
      this.$refs.board.drawChess(data.coordinate);
    },

    newGame(xIsNext) {
      this.winner = null;
      this.xIsNext = xIsNext;
      this.$refs.board.reset();
    }
  }
};
</script>
