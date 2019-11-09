<template>
  <div id="join-form" class="row centered-form">
    <div class="centered-form__form">
      <form id="join-room" @submit.prevent="login">
        <div class="form-field">
          <h3>Join Game</h3>
        </div>
        <div class="form-field">
          <label>Display name</label>
          <input type="text" v-model="username" autofocus autocomplete="off" />
        </div>
        <div class="form-field">
          <label>Choose room</label>
          <select id="room-list" v-model="selectedRoom">
            <option disabled>-- Pick a room --</option>
            <option v-for="room in roomList" :key="room" :value="room">{{ room }}</option>
          </select>
        </div>
        <div class="form-field">
          <label>Room name</label>
          <input
            type="text"
            v-model="newRoom"
            autocomplete="off"
            placeholder="Enter a name to create a new room"
          />
        </div>
        <div v-if="validateErr !== null">
          <span class="errorMsg">{{ validateErr }}</span>
        </div>
        <div class="form-field">
          <button @click="login">Join</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      roomList: [],
      selectedRoom: null,
      newRoom: "",
      validateErr: null
    };
  },

  methods: {
    login() {
      this.validateErr = this.validateData();
      if (this.validateErr) {
        return;
      }

      try {
        this.$socket.emit(
          "newUserJoin",
          {
            username: this.username,
            room: this.selectedRoom || this.newRoom
          },
          data => {
            if (data.status === "error") {
              this.validateErr = data.payload.msg;
            } else {
              this.validateErr = null;
              localStorage.setItem("id", data.payload.id);
              localStorage.setItem("username", this.username);
              localStorage.setItem("room", this.selectedRoom || this.newRoom);
              this.$router.replace({ name: "game" });
            }
          }
        );
      } catch (err) {
        alert(err);
      }
    },

    validateData() {
      if (!this.username) {
        return "Username is required!";
      }

      if (!this.selectedRoom && !this.newRoom) {
        return "Please pick a room or create a new one!";
      }
    }
  },

  sockets: {
    showRoomList(roomList) {
      roomList.forEach(room => {
        this.roomList.push(room);
      });
    }
  }
};
</script>

<style scoped>
h3 {
  font-weight: 600;
  text-align: center;
  font-size: 1.5rem;
}

button {
  border: none;
  background: #265f82;
  color: white;
  cursor: pointer;
  padding: 10px;
  transition: background 0.3s ease;
}

button:hover {
  border: none;
  background: #1f4c69;
  color: white;
  padding: 10px;
}

button:disabled {
  cursor: default;
  background: #698ea5;
}

.centered-form {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  background: -moz-linear-gradient(
    125deg,
    rgba(39, 107, 130, 1) 0%,
    rgba(49, 84, 129, 1) 100%
  ); /* ff3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, rgba(49, 84, 129, 1)),
    color-stop(100%, rgba(39, 107, 130, 1))
  ); /* safari4+,chrome */
  background: -webkit-linear-gradient(
    125deg,
    rgba(39, 107, 130, 1) 0%,
    rgba(49, 84, 129, 1) 100%
  ); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(
    125deg,
    rgba(39, 107, 130, 1) 0%,
    rgba(49, 84, 129, 1) 100%
  ); /* opera 11.10+ */
  background: -ms-linear-gradient(
    125deg,
    rgba(39, 107, 130, 1) 0%,
    rgba(49, 84, 129, 1) 100%
  ); /* ie10+ */
  background: linear-gradient(
    325deg,
    rgba(39, 107, 130, 1) 0%,
    rgba(49, 84, 129, 1) 100%
  ); /* w3c */
}

.centered-form__form {
  background: rgba(250, 250, 250, 0.9);
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  padding: 0px 20px;
  margin: 20px;
  width: 350px;
}

.form-field {
  margin: 20px 0;
}

.form-field > * {
  width: 100%;
}

.form-field label {
  display: block;
  margin-bottom: 7px;
}

.form-field input,
.form-field select {
  border: 1px solid #e1e1e1;
  padding: 10px;
}

.errorMsg {
  color: red;
  font-size: 13px;
}
</style>
