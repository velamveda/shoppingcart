<template>
  <div class="pageheight">
    <h1 class="carthead">Your cart</h1>
    <div>
      <div v-for="product in products" :key="product.id" :product="product"  @click="viewProduct($event)">
        <div class="cart-item-card">
            <div class="header">
              <div class="thumbnails"><img :src="getImage(product.src)" /></div>
                <h3>{{ product.name }}</h3>
                <h4>In Cart: {{ product.quantity }}</h4>
                <h4>Cost: {{ product.price * product.quantity }}</h4>
                <div class="close" @click="removeFromCart(product)">
                X
                </div>
            </div>
        </div>
      </div>
      <div class="total">
        Total cart= Rs: {{totalcost }}
      </div>
    <button class="cart btn mar" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { computed, ref } from '@vue/runtime-core'

export default {
  name:'CartView', 
  props:['product'],
  setup(){
    let products=ref('')
    let product = ref('')
    const store= useStore()
    products =computed(()=>store.getters.cartItem)
    const user=computed(() => store.state.user)
    const viewProduct=(prod)=>{
      product.value = prod 
      }
    const removeFromCart=(product)=>store.commit('removeFromCart',product)
    const checkout=()=>{
      console.log('in buy now')
      if(user.value){
        console.log(products)
        storeTheCart(products) 
      }
      else{
        alert('Please login to Buy')
      }
    }
    const storeTheCart=(products)=>{
      store.commit('storeTheCart',products)
    }
    return{ 
      viewProduct,      
      products,
      product,
      removeFromCart,
      totalcost: computed(()=>store.getters.cartTotal),
      getImage:(src)=> './../images' + src, 
      checkout
    }
  }
}
</script>

<style>
    .close{
      height:24px;
      width:20px;
      margin: auto 0;
      font-size:1rem;
      padding:2px;
      border-radius:5px;
      border:2px solid gray;
      color:gray;
      float:right;
      cursor:pointer;
    }
    .close:hover{
        background-color: lightgray;
    }
    .cart-item-card{
      width:90%;
      max-width: 400px;
      margin:1em auto;
      background-color:white;
      box-shadow:0 0 5px gray;
      border-radius:5px;
      padding:10px;
      text-align:left;
    }
    .cart-item-card .header{
      display: flex;
      justify-content: space-between;
    }
    .cart-item-card h3,.cart-item-card h4,.cart-item-card h5{
      margin:auto;
    }
    .carthead{
      padding-top: 1em;
    }
    .total{
      margin:1em;
    }
    .thumbnails img{
      width:70px;
      border: 1px solid black;
    }
    .mar{
      margin:10px;
    }
</style>

