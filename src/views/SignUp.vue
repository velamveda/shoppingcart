<template>
  <div class="pageheight login">
    <form @submit.prevent="handleSubmit">
      <h3>Sign up</h3>
      <div class="form-group">
      <label for="firstname">First Name:</label>
      <input type="text" name="firstname" v-model="firstname" required>
      </div>
      <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" required>
      </div>
      <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" pattern=".{6,}" oninput="checkpasswords()" required> 
      
      </div>
      <div class="form-group">
      <label for="confirm-password">Confirm Password:</label>
      <input type="password" name="confirmpassword" oninput="checkpasswords()" v-model="confirmpassword" required>
      </div>
      <div class="fmbtn">
      <button class="login">Sign up</button>
      </div>
      <div v-if="error">{{ error }}</div>
      <p>Already have an account? Please <router-link :class="{active: $route.name === 'login'}" to="/login">Login </router-link>here</p>
    </form>
  </div>
</template>

<script>
import { ref} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const store = useStore()
    const router = useRouter()
    const handleSubmit = async () => {
      try {
        await store.dispatch('signup', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }
    return { handleSubmit, email, password, error }
  }
}
function checkpasswords() {
  var p1 = document.getElementById("password");
  var p2 = document.getElementById("confirmpassword");
  console.log(p1.length())
  if (p1.value !== p2.value) {
    p2.setCustomValidity("Passwords do not match");
  } else {
    p2.setCustomValidity("");
  }
  var strength = document.getElementById("passwordStrength");
  var multiplier = 0;
  if ( /[a-z]/.test(p1.value) ) { multiplier++; }
  if ( /[A-Z]/.test(p1.value) ) { multiplier++; }
  if ( /[0-9]/.test(p1.value) ) { multiplier++; }
  strength.value = p1.value.length * multiplier;
}
</script>