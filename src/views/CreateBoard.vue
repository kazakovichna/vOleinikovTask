<template>
<div class="create-board">
  <form @submit.prevent="submitHandler">
    <div class="board-inputs">
      <div class="board-input">
        <input id="name"
               type="text"
               placeholder="Input name"
               v-model.trim="name"
        >
        <!--<label for="name"></label>-->
      </div>
      <div class="board-input">
        <input id="description"
               type="text"
               placeholder="Input description"
               v-model.trim="description"
        >
        <!--<label for="description"></label>-->
      </div>
      <button type="submit">
        Create Board
      </button>
    </div>
  </form>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: "CreateBoard",
  data: () => ({
    name: '',
    description: ''
  }),
  validations: {
    name: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    ...mapActions([
      'createBoard'
    ]),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.createBoard({
            name: this.name,
            description: this.description
        })
        this.name = ''
        this.description = ''
        this.$router.push('/')
      }
      catch (e) {}
    }
  }
}
</script>

<style scoped>
.create-board {
  width: 100%;
  display: flex;
  justify-content: center;
}
form {
  width: inherit;
  display: flex;
  justify-content: center;
}
.board-inputs {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60%;
}
button {

}
button:active {
  background-color: #5a5a5a;
  color: white;
  outline: none;
  border: none;
}
button:after {
  background-color: #5a5a5a;
  color: white;
  outline: none;
  border: none;
}
</style>
