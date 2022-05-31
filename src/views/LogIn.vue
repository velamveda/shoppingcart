<template>
<div class="pageheight loginform">
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>
    </div>
    <div class="form-group">
    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>
    </div>
    <div class="fmbtn">
    <button class="login">Login</button>
    </div>
    <div v-if="error">{{ error }}</div>
    <p>Does not have an account? Please <router-link :class="{active: $route.name === 'signup'}" to="/signup">Signup </router-link>here</p> 
  </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {db, storeCart, addDoc} from './../includes/firebase'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const store = useStore()
    const router = useRouter()
    const handleSubmit = async () => {
      console.log(email.value)
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }
    // const storeTheCart= (cart)=>{
    //   if(store.state.user){
    //     addDoc(storeCart,
    //     cart
    //   )}
    // }storeTheCart
    return { handleSubmit, email, password, error }
  }
}
</script>
<style>
.pageheight{
  min-height:calc(100vh - 163px);
  width: 100%;
}
.loginform form{
  width:100%;
  max-width:450px;   
  margin:20px auto;
  border: 2px solid  grey;
  padding: 20px;
  background-color: rgb(214, 210, 210);
}
.fmbtn{
  clear: both;
  width:100%;
  padding-bottom: 15px;
}
.login{
  width:100px;
 
}
.form-group{
    padding: 10px;
}
.form-group input{
    width:250px;
    color:black;
    font-size: 1rem;
    line-height: 1.5rem;
}
label, input{
    display: inline-block;
}
.form-group label{
    float: left;
    width: 100px;
}
</style>
