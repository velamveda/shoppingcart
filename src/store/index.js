import { createStore } from 'vuex'

// firebase imports
import { auth} from '../includes/firebase.js'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    addDoc,
    storeCart
} from './../includes/firebase'
function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}
const store = createStore({
    state: {
        cart: [],
        user: null,
        authIsReady: false,
        cartIsReady: false
    },getters: {
      authModalShow: (state) => state.authModalShow,
      productQuantity: state => product => {
          const item = state.cart.find(i => i.id === product.id)
          if (item) return item.quantity
          else return null
      },
      cartItem(state) {
          console.log('in store')
          console.log(state.cart)
          return state.cart
      },
      cartTotal(state) {
          return state.cart.reduce((a, b) => Number(a) + (Number(b.price) * Number(b.quantity)), 0)
      }
  },
    mutations: {
        setUser(state, payload) {
            state.user = payload
            console.log('user state changed:', state.user)
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
        },
        setCartIsReady(state,payload){
            state.cartIsReady =payload
        },
        addToCart(state, product) {
            console.log("store, add to cart")
          let item = state.cart.find(i => i.id === product.id)
          if (item) {
              item.quantity++
          } else {
              state.cart.push({...product, quantity: 1 })
          }
          updateLocalStorage(state.cart)
          
      },
      storeTheCart(_,cart){
          for (i=0;i<cart.length;i++){
            postCartRef= addDoc(storeCart, cart[i])
          }
        postCartRef.update()  
        store.commit(setStoreIsReady, true)
      },
      removeFromCart(state, product) {
          let item = state.cart.find(i => i.id === product.id)
          if (item) {
              if (item.quantity > 1) {
                  item.quantity--
              } else {
                  state.cart = state.cart.filter(i => i.id !== product.id)
              }
          }
          updateLocalStorage(state.cart)
      },
      updateCartFromLocalStorage(state) {
          const cart = localStorage.getItem('cart')
          if (cart) {
              state.cart = JSON.parse(cart)
          }
      }
    },
    actions: {
        async signup(context, { email, password }) {
            console.log('signup action')

            const res = await createUserWithEmailAndPassword(auth, email, password)
            if (res) {
                context.commit('setUser', res.user)
            } else {
                throw new Error('could not complete signup')
            }
        },
        async login(context, { email, password }) {
            console.log('login action')

            const res = await signInWithEmailAndPassword(auth, email, password)
            if (res) {
                context.commit('setUser', res.user)
                // storeTheCart(cart)
            } else {
                throw new Error('could not complete login')
            }
        },
        async logout(context) {
            console.log('logout action')

            await signOut(auth)
            context.commit('setUser', null)
        }
    }
})

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    store.commit('setUser', user)
    unsub()
})


// export the store
export default store