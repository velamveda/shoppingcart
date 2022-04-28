<template>
  <nav>
    <h1><router-link to="/">Shopping Cart</router-link></h1>
    
    <div class="menu" >
    <template v-if="authIsReady">
      <!-- for all users -->
      <div>
        <router-link to="/"><i class="fa fa-home"></i>Home</router-link>
      </div>
      <!-- for logged in users -->
      <div v-if="user">
        <button class="logout" @click="handleClick">Logout</button>
      </div>
      <!-- for logged out users -->
      <div v-if="!user">
        <router-link to="/login"><i class="fa fa-user"></i>Login</router-link>
        
      </div>
      <router-link to="/cart"><i class="fa fa-shopping-cart"></i>Cart</router-link>
    </template>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const store = useStore()
    const handleClick = () => {
      store.dispatch('logout')
    }
    return {
      handleClick,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady)
    }
  }
}
</script>
<style >
nav{
  width: 100%;
  background-color: #333333;
  padding:10px 10em;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
 
}
.fa{
  padding-right: 5px;
}
nav .menu{
  display: flex;
  width:13em;
  justify-content: space-between;
}
.logout{
  padding:0 5px;
  color:#ffffff;
  background-color:#333333;
  font-size: 1rem;
  border: none;
}
a{
  text-decoration: none;
  color: #ffffff;
}
</style>