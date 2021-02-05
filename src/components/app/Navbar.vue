<template>
  <div class="navbar">
    <nav class="navbar orange-сolor lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <router-link href="#"
                       to="/"
                       v-tooltip="'Homie'"
          >
            <img style="width: 40px" :src="require('../../assets/images/kisspng-real-estate-house-computer-icons-business-household-icon-5b37303ebd1ef2 1.svg')" alt="">
          </router-link>
          <span class="black-text"><b>{{date | date('datetime')}}</b></span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="user-name dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
            >
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link class="black-text" to="/profile">
                  <i class="material-icons">account_circle</i>{{ 'Profile_button' | localize}}
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a class="black-text" @click.prevent="signout">
                  <i class="material-icons">assignment_return</i>{{ 'Logout' | localize }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      date: new Date(),
      interval: null,
      dropdown: null
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    async signout () {
      await this.logout()
      this.$router.push('/login?message=logout')
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>

<style scoped>
.nav-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
  .orange-сolor {
    background-color: #b0bcbd;
  }
  .user-name {
    font-size: 20px;
    font-family: "Lucida Console", sans-serif;
    font-weight: 900;
    opacity: 0.8;
  }
</style>
